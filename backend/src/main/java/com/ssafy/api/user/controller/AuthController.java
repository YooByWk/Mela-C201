package com.ssafy.api.user.controller;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ssafy.api.user.request.UserLoginPostReq;
import com.ssafy.api.user.request.UserSendEmailPostReq;
import com.ssafy.api.user.response.UserLoginPostRes;
import com.ssafy.api.user.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.mail.MessagingException;
import java.time.Duration;
import java.time.Instant;

/**
 * 인증 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "인증 API", tags = {"Auth."})
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
	@Autowired
	UserService userService;

	@Autowired
	PasswordEncoder passwordEncoder;

	@PostMapping("/login")
	@ApiOperation(value = "로그인", notes = "<strong>아이디와 패스워드</strong>를 통해 로그인 한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
			@ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
			@ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
	})
	public ResponseEntity<UserLoginPostRes> login(@RequestBody @ApiParam(value="로그인 정보", required = true) UserLoginPostReq loginInfo) {
		String userEmail = loginInfo.getId();
		String password = loginInfo.getPassword();

		String emailId = userEmail.substring(0, userEmail.indexOf('@'));
		String emailDomain = userEmail.substring(userEmail.indexOf('@') + 1);

		User user = userService.getUserByEmailIdAndEmailDomain(emailId, emailDomain);

		if (user.getUserType().equals("unauth")) {
			return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "Unauthorized", null));
		}

		// 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
		if(passwordEncoder.matches(password, user.getPassword())) {
			// 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
			String jwtToken = JwtTokenUtil.getToken(userEmail);
			userService.loginSaveJwt(emailId, jwtToken);
			return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", jwtToken));
		}

		// 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
		return ResponseEntity.status(404).body(UserLoginPostRes.of(404, "Not Found", null));
	}

	@GetMapping("/logout")
	@ApiOperation(value = "로그아웃", notes = "<strong>로그아웃 버튼</strong>을 통해 로그아웃 한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
			@ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
			@ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
	})
	public ResponseEntity<? extends BaseResponseBody> logout(@ApiIgnore Authentication authentication){
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();

		String email = userDetails.getUsername();

		userService.logoutSaveJwt(email);

		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}

	@PostMapping("/email")
	@ApiOperation(value = "이메일 인증 메일 전송", notes = "<strong>이메일 아이디</strong>을 통해 메일을 전송한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
	})
	public ResponseEntity<? extends  BaseResponseBody> sendEmail(@RequestBody UserSendEmailPostReq sendEmailInfo) {
		Instant expires = Instant.now().plus(Duration.ofDays(1));
		String token = JwtTokenUtil.getToken(expires, sendEmailInfo.getEmailId());

		User user = userService.getUserByEmailId(sendEmailInfo.getEmailId());

        try {
            userService.sendAuthEmail(user.getUserIdx(),token);
        } catch (MessagingException e) {
			e.printStackTrace();
            throw new RuntimeException(e);
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}

	@CrossOrigin
	@GetMapping("/verify")
	@ApiOperation(value = "사용자 이메일 인증", notes = "<strong>token</strong>을 통해 메일을 인증 완료한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
			@ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
			@ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
	})
	public ResponseEntity<String> verifyEmail(@RequestParam String token) {
		JWTVerifier verifier = JwtTokenUtil.getVerifier();

		try {
			DecodedJWT decodedJWT = verifier.verify(token.replace(JwtTokenUtil.TOKEN_PREFIX, ""));
			String emailId = decodedJWT.getSubject();

			try {
				User user = userService.getUserByEmailId(emailId);
				if(!userService.verifyEmail(user.getUserIdx(), token)) {
					return ResponseEntity.status(401).body("유효하지 않은 주소입니다.");
				}
			} catch (Exception e) {
				e.printStackTrace();
				return ResponseEntity.status(404).body("유효하지 않은 주소입니다.");
			}

		} catch (JWTVerificationException e) {
			e.printStackTrace();
			return ResponseEntity.status(401).body("유효하지 않은 주소입니다.");
		}


		return ResponseEntity.status(200).body("인증 완료되었습니다.");
	}
}
