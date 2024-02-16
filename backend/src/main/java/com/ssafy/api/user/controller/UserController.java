package com.ssafy.api.user.controller;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ssafy.api.board.request.RecruitGetMyListReq;
import com.ssafy.api.board.response.BoardRecruitListRes;
import com.ssafy.api.board.response.BoardRecruitRes;
import com.ssafy.api.board.service.BoardService;
import com.ssafy.api.board.service.RecruitService;
import com.ssafy.api.file.service.FileService;
import com.ssafy.api.shorts.service.ShortsService;
import com.ssafy.api.user.request.*;
import com.ssafy.api.user.response.FeedRes;
import com.ssafy.api.user.response.UserLoginPostRes;
import com.ssafy.api.user.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import retrofit2.http.Path;
import springfox.documentation.annotations.ApiIgnore;

import javax.mail.MessagingException;
import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Slf4j
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

	@Autowired
	UserService userService;
	@Autowired
	BoardService boardService;
	@Autowired
	RecruitService recruitService;
	@Autowired
	PortfolioAbstractRepository portfolioAbstractRepository;
	@Autowired
	PortfolioMusicRepositorySupport portfolioMusicRepositorySupport;
	@Autowired
	UserPositionRepository userPositionRepository;
	@Autowired
	UserGenreRepository userGenreRepository;

	@Autowired
	PositionRepository positionRepository;

	@Autowired
	GenreRepository genreRepository;

	@Autowired
	ShortsService shortsService;

	@Autowired
	FileService fileService;

	@PostMapping()
	@ApiOperation(value = "회원 가입", notes = "<strong>아이디와 패스워드 ...를</strong>를 통해 회원가입 한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> register (
			@RequestBody @ApiParam(value="회원가입 정보", required = true) UserRegisterPostReq registerInfo) {

		//임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
		User user = userService.createUser(registerInfo);

		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}

	@GetMapping("/myinfo")
	@ApiOperation(value = "회원 본인 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> getUserInfo(@ApiIgnore Authentication authentication) {
		/**
		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
		 * 액세스 토큰이 없이 요청하는 경우, 401 에러 발생.
		 *
		 * Swagger UI에서 테스트 해보니 500 Error 뜨네요 (java.lang.NullPointerException: null) 발생 원인: SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		 */

		SsafyUserDetails userDetails = null;

		try {
			userDetails = (SsafyUserDetails) authentication.getDetails();
			User user = userDetails.getUser();

			//ArrayIndexOutOfBoundsException 원인 될 수 있음
			Object[] returnVO = new Object[4];

			//1. 유저 기본 정보
			returnVO[0] = user;														//user 객체 반환 (user_idx, birth, email_domain, email_id, gender, jwt_token, name, nickname, password, search_allow, user_type)

			//2. 유저 포트폴리오
			returnVO[1] = portfolioAbstractRepository.findByUserIdx(user);			//portfolio_abstract 객체 반환 (portfolio_abstract_idx, instagram, self_intro, youtube, portfolio_picture_file_idx, user_idx)

			//3. 유저 포지션
			ArrayList<Long> userPositionList = new ArrayList<>();
			ArrayList<String> userPositionListString = new ArrayList<>();
			try {
				List<UserPosition> positionList = userPositionRepository.findPositionIdxByUserIdx(user);

				for(UserPosition userPosition : positionList) {
					userPositionList.add(userPosition.getPositionIdx().getPositionIdx());

					// String으로 변경
					String userPositionString = positionRepository.getOne(userPosition.getPositionIdx().getPositionIdx()).getPositionName();
					userPositionListString.add(userPositionString);

				}
			} catch (Exception e) {
				e.printStackTrace();
			}
//            returnVO[2] = userPositionList;
			returnVO[2] = userPositionListString;

			//4. 유저 장르
			ArrayList<Long> userGenreList = new ArrayList<>();
			ArrayList<String> userGenreListString = new ArrayList<>();
			try {
				List<UserGenre> genreList = userGenreRepository.findGenreIdxByUserIdx(user);

				for(UserGenre userGenre : genreList) {
					long userPosition = genreRepository.findById(userGenre.getGenreIdx().getGenreIdx()).get().getGenreIdx();
					userGenreList.add(userPosition);

					// String으로 변경
					String userGenreString = genreRepository.getOne(userPosition).getGenreName();
					userGenreListString.add(userGenreString);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
//            returnVO[3] = userGenreList;
			returnVO[3] = userGenreListString;

			return ResponseEntity.status(200).body(returnVO);
		} catch(NullPointerException e) {
			e.printStackTrace();

			return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Authentication failed!"));
		} catch(Exception e) {
			e.printStackTrace();
		}

		return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Server failed!"));
	}

	@PutMapping(value = "/myinfo", consumes = MULTIPART_FORM_DATA_VALUE)
	@ApiOperation(value = "회원 본인 정보 수정", notes = "로그인한 회원 본인의 정보를 수정한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> updateUser(
			@ApiIgnore Authentication authentication,
			@RequestPart(required = false) @ApiParam(value="회원정보 수정 정보") UserUpdatePostReq userUpdateInfo,
			@RequestPart(required = false) @ApiParam(value="회원 포트폴리오 수정 정보") PortfolioAbstractPostReq portfolioAbstractPostReq,
			@RequestPart(required = false) MultipartFile portfolioPicture) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();

		log.info("회원수정정보 {}", userUpdateInfo);
		log.info("회원포트폴리오수정정보 {}", portfolioAbstractPostReq);
		log.info("프로필사진 {}", portfolioPicture);

		userService.updateUser(userDetails.getUser(), userUpdateInfo, portfolioAbstractPostReq, portfolioPicture);

		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}

	@DeleteMapping("/delete")
	@ApiOperation(value = "회원 탈퇴", notes = "로그인한 회원의 탈퇴를 진행한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> deleteUser(@ApiIgnore Authentication authentication){

		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();


		String userEmail = userDetails.getUsername();
		User user = userService.getUserByEmail(userEmail);

		userService.deleteUser(user);

		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}

	@GetMapping("/emailid/{userId}")
	@ApiOperation(value = "이메일 아이디 중복 확인", notes = "기존에 존재하는 아이디인지 확인한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 409, message = "아이디 중복"),
			@ApiResponse(code= 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> checkDupId(@PathVariable String userId) {
		if(!userService.idDupCheck(userId)) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "Conflict"));
		}

		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}

	@GetMapping("/nickname/{nickname}")
	@ApiOperation(value = "닉네임 중복 확인", notes = "기존에 존재하는 닉네임인지 확인한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "닉네임 중복 없음"),
			@ApiResponse(code = 409, message = "닉네임 중복 있음"),
			@ApiResponse(code= 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> checkDupNickname(@PathVariable String nickname) {
		if (!userService.nicknameDupCheck(nickname)) {

			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
		}

		return ResponseEntity.status(409).body(BaseResponseBody.of(409, "Conflict"));
	}

	@PostMapping("/password")
	@ApiOperation(value = "비밀번호 확인", notes = "회원 정보 조회 또는 탈퇴를 위해 사용자가 입력한 비밀번호와 DB에 저장된 비밀번호를 대조한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> checkPassword(
			@ApiIgnore Authentication authentication,
			@RequestBody @ApiParam(value="비밀번호", required = true) String inputPassword) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		User user = userService.getUserByEmail(userId);

		if(userService.checkPassword(inputPassword, user)) {
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
		}

		return ResponseEntity.status(401).body(BaseResponseBody.of(401, "인증 실패"));
	}

	@PutMapping("/password")
	@ApiOperation(value = "비밀번호 변경", notes = "사용자의 비밀번호를 사용자에게 입력 받은 비밀번호로 변경한다")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> updatePassword(
			@ApiIgnore Authentication authentication,
			@RequestBody @ApiParam(value="비밀번호", required = true) String inputPassword) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		User user = userService.getUserByEmail(userId);

		userService.updatePassword(inputPassword, user);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}

	@PostMapping("/email")
	@ApiOperation(value = "비밀번호 변경 링크 이메일 전송", notes = "<strong>이메일 아이디</strong>을 통해 메일을 전송한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
	})
	public ResponseEntity<? extends  BaseResponseBody> sendEmail(@RequestBody UserSendEmailPostReq sendEmailInfo) {
		Instant expires = Instant.now().plus(Duration.ofDays(1));
		String token = JwtTokenUtil.getToken(expires, sendEmailInfo.getEmailId());

		User user = userService.getUserByEmailId(sendEmailInfo.getEmailId());

		try {
			userService.sendFindPasswordEmail(user.getUserIdx(), token);
		} catch (MessagingException e) {
			e.printStackTrace();
			return ResponseEntity.status(400).body(BaseResponseBody.of(400, "bad request"));
		}

		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}

	@PutMapping("/newpassword")
	@ApiOperation(value = "비밀번호 재설정", notes = "비로그인 사용자의 비밀번호 재설정")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
	})
	public ResponseEntity<? extends  BaseResponseBody> modifyPassword(@RequestBody UserFindPasswordPutReq reqInfo) {
			JWTVerifier verifier = JwtTokenUtil.getVerifier();

			try {
				DecodedJWT decodedJWT = verifier.verify(reqInfo.getToken().replace(JwtTokenUtil.TOKEN_PREFIX, ""));
				String emailId = decodedJWT.getSubject();

				try {
					User user = userService.getUserByEmailId(emailId);
					userService.updatePassword(reqInfo.getPassword(), user);
				} catch (Exception e) {
					e.printStackTrace();
					return ResponseEntity.status(404).body(BaseResponseBody.of(404, "Not Found"));
				}

			} catch (JWTVerificationException e) {
				e.printStackTrace();
				return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Unauthorized"));
			}


			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
		}

	@GetMapping("/generaterandomnickname")
	@ApiOperation(value = "랜덤 닉네임 생성", notes = "중복되지 않는 랜덤 닉네임을 생성한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<String> generateRandomNickname() {
		String randomNickname = null;
		long start = System.currentTimeMillis();
		long now;

		//1.5초간 중복없는 랜덤 닉네임 생성
		do {
			now = System.currentTimeMillis();
			randomNickname = userService.generateRandomNickname();

			if (!userService.nicknameDupCheck(randomNickname)) {

				return ResponseEntity.status(200).body(randomNickname);
			}
		} while ((now - start) / 1000 <= 1.5);

		return ResponseEntity.status(500).body("랜덤 닉네임 생성 실패");
	}

	@PutMapping("/follow/{userId}")
	@ApiOperation(value = "특정 사용자를 팔로우", notes = "특정 사용자를 팔로우한다")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> followUser(
			@ApiIgnore Authentication authentication,
			@PathVariable String userId) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userEmail = userDetails.getUsername();
		User nowLoginUser = userService.getUserByEmail(userEmail);
		userService.followUser(nowLoginUser,userId);

		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}

	@GetMapping("/{userId}/isfollow")
	@ApiOperation(value = "사용자와 팔로우한 유저인지 체크", notes = "현재 로그인한 사용자와 userId 사용자가 팔로우 관계인지 체크")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<Boolean> isFollow(
			@ApiIgnore Authentication authentication,
			@PathVariable String userId) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userEmail = userDetails.getUsername();
		User nowLoginUser = userService.getUserByEmail(userEmail);

		return ResponseEntity.status(200).body(userService.isFollow(nowLoginUser, userId));
	}

	@GetMapping("/{userId}/followers")
	@ApiOperation(value = "사용자가 팔로우한 사람들 목록", notes = "특정 사용자가 팔로우한 사람들 목록을 보여준다")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<List<User>> getFollower(
			@PathVariable String userId) {

		List<User> followerList = userService.getFollower(userId);

		return ResponseEntity.status(200).body(followerList);
	}

	@GetMapping("/{userId}/followees")
	@ApiOperation(value = "사용자를 팔로우한 사람들 목록", notes = "특정 사용자를 팔로우한 사람들의 목록을 보여준다")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code= 500, message = "서버 오류")
	})
	public ResponseEntity<List<User>> getFollowee(
			@PathVariable String userId) {

		List<User> followeeList = userService.getFollowee(userId);

		return ResponseEntity.status(200).body(followeeList);
	}


	@GetMapping("/notifications")
	@ApiOperation(value = "알람 가져오기", notes = "로그인 한 사용자의 알람을 보여주기 위해 가져온다")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<List<Notification>> getNotification(
			@ApiIgnore Authentication authentication) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userEmail = userDetails.getUsername();
		User nowLoginUser = userService.getUserByEmail(userEmail);

		List<Notification> notiList = userService.getNotification(nowLoginUser);

		return ResponseEntity.status(200).body(notiList);
	}

	@GetMapping("/notifications/{notificationid}")
	@ApiOperation(value = "알람 확인하기", notes = "로그인 한 사용자가 확인한 알람을 체크한다")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<String> checkNotification(
			@ApiIgnore Authentication authentication,
			@PathVariable(name = "notificationid") Long notiIdx) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userEmail = userDetails.getUsername();
		User nowLoginUser = userService.getUserByEmail(userEmail);

		String message = userService.checkNotification(nowLoginUser, notiIdx);
		System.out.println(message);

		return ResponseEntity.status(200).body(message);
	}

	@DeleteMapping("/notifications/{notificationid}")
	@ApiOperation(value = "알람 삭제하기", notes = "로그인 한 사용자가 선택한 알람을 삭제한다")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> deleteNotification(
			@ApiIgnore Authentication authentication,
			@PathVariable(name = "notificationid") Long notiIdx) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userEmail = userDetails.getUsername();
		User nowLoginUser = userService.getUserByEmail(userEmail);

		userService.deleteNotification(nowLoginUser, notiIdx);

		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}

	@GetMapping("/feed")
	@ApiOperation(value = "피드 목록", notes = "내가 팔로우하는 사용자들의 알림 목록")
	public ResponseEntity<List<FeedRes>> getFeed(@ApiIgnore Authentication authentication) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userEmail = userDetails.getUsername();
		User user = userService.getUserByEmail(userEmail);

		List<Feed> feeds = userService.getFeed(user);
		List<FeedRes> res = new ArrayList<>();
		for (Feed feed : feeds) {
			res.add(FeedRes.of(feed));
		}

		return ResponseEntity.status(200).body(res);
	}

	@GetMapping("/{userid}/portfolio")
	@ApiOperation(value = "포트폴리오 조회", notes = "포트폴리오 정보를 응답한다. (타인의 포트폴리오 조회 가능)")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 403, message = "조회할 수 없는 사용자"),	//로그인하지 않고 내 정보 확인 또는 정보공개 (searchAllow가 false인 사용자) 거부한 사용자의 포트폴리오를 요청한 경우
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> browsePortfolioAbstract(@ApiIgnore Authentication authentication, @PathVariable(name = "userid") String userid) {
		SsafyUserDetails userDetails = null;
		String userEmail = null;			//로그인한 사용자의 ID
		User user = null;
		User targetUser = null;
		String targetUserId = userid;		//포트폴리오를 조회 대상 ID

		//ArrayIndexOutOfBoundsException 원인 될 수 있음
		Object[] returnVO = new Object[6];

		//로그인 되어있는지 검사
		try {
			userDetails = (SsafyUserDetails) authentication.getDetails();
			userEmail = userDetails.getUsername();
			user = userService.getUserByEmail(userEmail);
		} catch(Exception e) {
			//e.printStackTrace();
			//return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Authentication failed!"));
		}

		//1. 조회하려는 사용자가 없는 경우 (잘못된 이메일 아이디)
		try {
			targetUser = userService.getUserByEmailId(targetUserId);
		} catch(Exception e) {
			//e.printStackTrace();
			return ResponseEntity.status(404).body("Fail. Check error code");
		}

		int returnCode = userService.isAllowedToBrowsePortfolioAbstract(userEmail, targetUser);
		//2. 조회할 수 있는 사용자
		if(returnCode == 200) {

			PortfolioAbstract portfolioAbstract = userService.browsePortfolioAbstract(userid);
			List<PortfolioMusic> portfolioMusicList = portfolioMusicRepositorySupport.getPortfolioMusicListByUserIdx(targetUser);
			targetUser.setPassword("");

			//2-1. 유저 기본 정보
			returnVO[0] = targetUser;

			//2-2. 유저 포트폴리오
			returnVO[1] = portfolioAbstract;

			//2-3. 유저 포트폴리오 뮤직
			returnVO[2] = portfolioMusicList;

			//2-4. 유저 업로드 쇼츠
			//2-4-1. 조회할 사용자의 쇼츠 리스트 가져옴
			List<Shorts> shortsList = shortsService.getShortsListByUserIdx(targetUser);
			List<com.ssafy.api.board.response.Shorts> shortsListResponse = new ArrayList<>();

			for(Shorts shorts : shortsList) {
				com.ssafy.api.board.response.Shorts shortsResponse = new com.ssafy.api.board.response.Shorts();

				//setter 호출
				shortsResponse.setShortsIdx(shorts.getShortsIdx());
				shortsResponse.setUserIdx(shorts.getUserIdx());
				shortsResponse.setTitle(shorts.getTitle());
				shortsResponse.setDescription(shorts.getDescription());
				shortsResponse.setShortsPathFileIdx(shorts.getShortsPathFileIdx());

				String videoUrl = null;

				//fileservice를 이용해 Amazon S3 영상 링크 가져오기
				try {
					videoUrl = fileService.getVideoUrlBySaveFileIdx(shorts.getShortsPathFileIdx().getFileIdx());
				} catch (Exception e) {
					e.printStackTrace();
				}


				//com.ssafy.api.board.response.Shorts DTO에 영상 링크 설정
				shortsResponse.setFileURL(videoUrl);
				//리스트 추가
				shortsListResponse.add(shortsResponse);
			}

			returnVO[3] = shortsListResponse;

			//2-5. 유저 포지션
			ArrayList<Long> userPositionList = new ArrayList<>();
			ArrayList<String> userPositionListString = new ArrayList<>();
			try {
				List<UserPosition> positionList = userPositionRepository.findPositionIdxByUserIdx(targetUser);

				for(UserPosition userPosition : positionList) {
					userPositionList.add(userPosition.getPositionIdx().getPositionIdx());

					// String으로 변경
					String userPositionString = positionRepository.getOne(userPosition.getPositionIdx().getPositionIdx()).getPositionName();
					userPositionListString.add(userPositionString);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
//            returnVO[4] = userPositionList;
			returnVO[4] = userPositionListString;

			//2-6. 유저 장르
			ArrayList<Long> userGenreList = new ArrayList<>();
			ArrayList<String> userGenreListString = new ArrayList<>();
			try {
				List<UserGenre> genreList = userGenreRepository.findGenreIdxByUserIdx(targetUser);

				for(UserGenre userGenre : genreList) {
					long userPosition = genreRepository.findById(userGenre.getGenreIdx().getGenreIdx()).get().getGenreIdx();
					userGenreList.add(userPosition);

					// String으로 변경
					String userGenreString = genreRepository.getOne(userPosition).getGenreName();
					userGenreListString.add(userGenreString);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
//            returnVO[5] = userGenreList;
			returnVO[5] = userGenreListString;

			return ResponseEntity.status(200).body(returnVO);
		//3. 조회할 수 없는 사용자 (searchAllow false)
		} else {
			return ResponseEntity.status(returnCode).body("Fail. Check error code");
		}

	}
	@GetMapping("/recruit")
	@ApiOperation(value = "구인글 조회", notes = "구인글 정보를 응답한다.")
	public ResponseEntity<?> getRecruitList(
			@ApiIgnore Authentication authentication,
			@ApiParam(value = "페이지 번호 (1부터 시작)", example = "1") @RequestParam int page,
			@ApiParam(value = "페이지당 글 수", example = "10") @RequestParam int size
	) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userEmail = userDetails.getUsername();
		User user = userService.getUserByEmail(userEmail);

		page-=1; // 1부터 시작하도록 함

		RecruitGetMyListReq recruitGetListReq = new RecruitGetMyListReq();
		recruitGetListReq.setPage(page);
		recruitGetListReq.setSize(size);

		List<BoardRecruit> recruits = recruitService.getMyBoardList(recruitGetListReq, user);
		List<BoardRecruitRes> res = new ArrayList<>();
		for (BoardRecruit board : recruits) {
			List<Position> positions = recruitService.getPositions(board.getBoardRecruitIdx());
			res.add(BoardRecruitRes.of(board.getBoardIdx(), board, positions, boardService.getBoardLikeNum(board.getBoardIdx().getBoardIdx())));
		}

		// 내 글 개수 세기
		return ResponseEntity.status(200).body(BoardRecruitListRes.of(res, recruitService.getMyBoardTotalCount(user)));
	}

	@GetMapping("/totalsearchuser/{word}")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<List<PortfolioAbstract>> totalSearch(
			@PathVariable(name = "word") String word
	) {
		List<PortfolioAbstract> userPortfolioAbstractList = new ArrayList<>();
		List<User> userListByName = userService.getUserByNameOrNickname(word, word);

		for(User userItem : userListByName){
			PortfolioAbstract userPortAbst = null;
//			Optional<PortfolioAbstract> userPortAbst = portfolioAbstractRepository.findByUserIdx(userItem);
			try {
				userPortAbst = portfolioAbstractRepository.findByUserIdx(userItem);
			} catch (Exception e) {
				e.printStackTrace();
			}
//			if(userPortAbst.isPresent()){
			if(userPortAbst != null){
				userPortfolioAbstractList.add(userPortAbst);
			}
		}
		return ResponseEntity.status(200).body(userPortfolioAbstractList);
	}

}