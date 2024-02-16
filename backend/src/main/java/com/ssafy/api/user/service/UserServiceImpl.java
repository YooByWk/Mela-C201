package com.ssafy.api.user.service;

import com.ssafy.api.file.service.FileService;
import com.ssafy.api.user.request.PortfolioAbstractPostReq;
import com.ssafy.api.user.request.UserRegisterPostReq;
import com.ssafy.api.user.request.UserUpdatePostReq;
import com.ssafy.common.util.CSVParser;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Random;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Slf4j
@Transactional
@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepository;
	@Autowired
	EmailAuthRepository emailAuthRepository;
	@Autowired
	PasswordEncoder passwordEncoder;
	@Autowired
	FollowRepository followRepository;
	@Autowired
	FollowRepositorySupport followRepositorySupport;
	@Autowired
	NotificationRepository notificationRepository;
	@Autowired
	FeedRepositorySupport feedRepositorySupport;
	@Autowired
	private JavaMailSender mailSender;
	@Autowired
	PortfolioAbstractRepository portfolioAbstractRepository;
	@Autowired
	FileService fileService;

	@Autowired
	UserPositionRepositorySupport userPositionRepositorySupport;

	@Autowired
	UserGenreRepository userGenreRepository;

	@Autowired
	UserPositionRepository userPositionRepository;

	@Autowired
	GenreRepository genreRepository;

	@Autowired
	PositionRepository positionRepository;

	Random random = new Random();
	CSVParser frontWords = new CSVParser("front_words");
	CSVParser backWords = new CSVParser("back_words");

//	@Value("${server.address}")
//	String serverAddress = "localhost";
	String serverAddress = "i10c201.p.ssafy.io";

//	@Value("${server.port}")
//	String serverPort = "8080";

	@Override
	public User createUser(UserRegisterPostReq userRegisterInfo) {
		User user = new User();
		user.setEmailId(userRegisterInfo.getEmailId());
		user.setEmailDomain(userRegisterInfo.getEmailDomain());
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		user.setPassword(passwordEncoder.encode(userRegisterInfo.getPassword()));
		user.setName(userRegisterInfo.getName());
		user.setNickname(userRegisterInfo.getNickname());
		user.setGender(userRegisterInfo.getGender());
		user.setBirth(userRegisterInfo.getBirth());
		user.setUserType("unauth");

		// boolean은 isXXX으로 getter 만들어짐!!
		user.setSearchAllow(userRegisterInfo.isSearchAllow());

		PortfolioAbstract portfolioAbstract = new PortfolioAbstract();
		portfolioAbstract.setUserIdx(user);
		portfolioAbstractRepository.save(portfolioAbstract);

		return userRepository.save(user);
	}

	@Override
	public User getUserByUserIdx(Long userIdx) {
		return userRepository.getOne(userIdx);
	}

	@Override
	public User getUserByEmail(String email) {
		String emailId = email.substring(0, email.indexOf('@'));
		String emailDomain = email.substring(email.indexOf('@')+1);
		User user = userRepository.findByEmailIdAndEmailDomain(emailId, emailDomain).get();
		return user;
	}

	@Override
	public User getUserByEmailId(String emailId) {
		User user = userRepository.findByEmailId(emailId).get();
		return user;
	}

	@Override
	public List<User> getUserByNameOrNickname(String userName, String userNickname) {
		List<User> userList = userRepository.findByNameContainingOrNicknameContaining(userName, userNickname);
		return userList;
	}



	@Override
	public User getUserByEmailIdAndEmailDomain(String emailId, String emailDomain) {
		User user = userRepository.findByEmailIdAndEmailDomain(emailId, emailDomain).get();
		return user;
	}

	@Override
	public void loginSaveJwt(String userId, String jwtToken){
		User user = userRepository.findByEmailId(userId).get();
		user.setJwtToken(jwtToken);
		userRepository.save(user);
	}

	@Override
	public void logoutSaveJwt(String email) {
		String emailId = email.substring(0, email.indexOf('@'));
		User user = userRepository.findByEmailId(emailId).get();
		user.setJwtToken(null);
		userRepository.save(user);
	}

	@Override
	public void updateUser(User user, UserUpdatePostReq userUpdateInfo, PortfolioAbstractPostReq portfolioAbstractPostReq, MultipartFile portfolioPicture) {
		if(userUpdateInfo != null) {
			user.setName(userUpdateInfo.getName());
			user.setNickname(userUpdateInfo.getNickname());
			user.setBirth(userUpdateInfo.getBirth());
			user.setGender(userUpdateInfo.getGender());
			user.setSearchAllow(userUpdateInfo.isSearchAllow());

			//TODO: 희망 장르 삭제될 때 user 삭제되는지 확인 필요
			//1-1. 기존 회원의 선호 장르 레코드 삭제
			try {
				userGenreRepository.deleteAllRecordsByUserIdx(user);
			} catch (Exception e) {
				e.printStackTrace();
			}

			//1-2. 기존 회원의 희망 포지션 레코드 삭제
			try {
				userPositionRepository.deleteAllRecordsByUserIdx(user);
			} catch (Exception e) {
				e.printStackTrace();
			}

			log.info("getGenre: {}", userUpdateInfo.getGenre());

			List<String> genreString = userUpdateInfo.getGenre();

			for(String s : genreString) {
				Genre genre = genreRepository.findByGenreName(s).get();

				UserGenre userGenre = new UserGenre();
				userGenre.setUserIdx(user);
				userGenre.setGenreIdx(genre);

				userGenreRepository.save(userGenre);
			}

			List<String> positionLong = userUpdateInfo.getPosition();
			for(String s : positionLong) {
				Position position = positionRepository.findByPositionName(s).get();

				UserPosition userPosition = new UserPosition();
				userPosition.setUserIdx(user);
				userPosition.setPositionIdx(position);

				//DB 저장
				userPositionRepository.saveAndFlush(userPosition);
			}

			//2-1. 새로 입력받은 회원의 선호 장르 추가
//			List<Long> genreLong = userUpdateInfo.getGenre();
//
//
//			//장르 추가
//			for(long l : genreLong) {
//				Genre genre = genreRepository.findById(l).get();
//
//				UserGenre userGenre = new UserGenre();
//				userGenre.setUserIdx(user);
//				userGenre.setGenreIdx(genre);
//
//				//DB 저장
//				userGenreRepository.save(userGenre);
//			}
//
//			//2-2. 새로 입력받은 회원의 희망 포지션 추가
//			List<Long> positionLong = userUpdateInfo.getPosition();
//
//			//포지션 추가
//			for(long l : positionLong) {
//				Position position = positionRepository.findById(l).get();
//
//				UserPosition userPosition = new UserPosition();
//				userPosition.setUserIdx(user);
//				userPosition.setPositionIdx(position);
//
//				//DB 저장
//				userPositionRepository.saveAndFlush(userPosition);
//			}
//
//			userRepository.saveAndFlush(user);
		}

		if(portfolioAbstractPostReq != null) {
			//portfolio_abstract 테이블에 유저식별번호 (user_idx) 일치하는 레코드 검색
			PortfolioAbstract portfolioAbstract = null;
			try {
//				portfolioAbstract = portfolioAbstractRepository.findByUserIdx(user).get();
				portfolioAbstract = portfolioAbstractRepository.findByUserIdx(user);
			} catch(NoSuchElementException e) {													//portfolio_abstract 테이블에 유저식별번호 (user_idx) 일치하는 레코드 없음 -> 생성
				e.printStackTrace();
			} finally {
				portfolioAbstract.setInstagram(portfolioAbstractPostReq.getInstagram());		//instagram
				portfolioAbstract.setSelfIntro(portfolioAbstractPostReq.getSelfIntro());		//self_intro
				portfolioAbstract.setYoutube(portfolioAbstractPostReq.getYoutube());			//youtube

				portfolioAbstractRepository.saveAndFlush(portfolioAbstract);
			}
		}

		//클라이언트에서 프로필 사진을 업로드 했다면 (파일이 비어있지 않다면)
		if(portfolioPicture != null) {
			//1. 프로필 사진 저장 (Amazon S3, file 테이블)
			com.ssafy.db.entity.File file = fileService.saveFile(portfolioPicture, "", user);
			PortfolioAbstract portfolioAbstract = null;

			try {
				//2. portfolio_abstract 테이블에 유저식별번호 (user_idx) 일치하는 레코드 검색
//				portfolioAbstract = portfolioAbstractRepository.findByUserIdx(user).get();
				portfolioAbstract = portfolioAbstractRepository.findByUserIdx(user);

				//3-1. 일치하는 레코드가 있으면 프로필사진 파일 식별번호 업데이트 (portfolio_picture_file_idx)
				portfolioAbstract.setPortfolio_picture_file_idx(file);							//프로필사진 파일 식별번호 업데이트 (portfolio_picture_file_idx)
				portfolioAbstractRepository.save(portfolioAbstract);
				userRepository.saveAndFlush(user);
				//3-2. 일치하는 레코드가 없는 경우
			} catch(NoSuchElementException e) {
				e.printStackTrace();
			} catch(Exception e) {
				e.printStackTrace();
			}
		}

	}

	@Override
	public void deleteUser(User user) {
		userRepository.delete(user);
	}

	@Override
	public boolean idDupCheck(String emailId) {
		if (userRepository.findByEmailId(emailId).isPresent()) {
			return false;
		} else {
			return true;
		}
	}

	@Override
	public boolean checkPassword(String password, User user) {
		//입력받은 패스워드를 암호화 하여 DB에 저장된 패스워드와 대조
		return passwordEncoder.matches(password, user.getPassword());
	}

	@Override
	public void updatePassword(String password, User user) {
		user.setPassword(passwordEncoder.encode(password));
		userRepository.save(user);
		
		deleteAuthToken(user); // 이메일을 통한 비밀번호 재설정인 경우
	}

	@Override
	public void deleteAuthToken(User user) {
		Optional<EmailAuth> emailAuth = emailAuthRepository.findByUserIdx(user);

		if (emailAuth.isPresent()) {
			emailAuthRepository.delete(emailAuth.get());
		}
	}

	@Override
	public boolean nicknameDupCheck(String nickName) {
		boolean result = userRepository.findByNickname(nickName).isPresent();

		return result;
	}

	public String generateRandomNickname() {
		int randomIndex = 0;
		String randomNickname = null;

		random.setSeed(System.currentTimeMillis() * 10_000);
		randomIndex = random.nextInt(frontWords.getSize());
		randomNickname = frontWords.getWord(randomIndex);

		random.setSeed(System.currentTimeMillis() * 20_000);
		randomIndex = random.nextInt(backWords.getSize());
		randomNickname += backWords.getWord(randomIndex);

		return randomNickname;
	}

	/**
	 *
	 * @param userIdx
	 * @return false : emailAuth 테이블에 존재하는 유저 /  true : emailAuth 테이블에 존재하지 않는 유저
	 */
	@Override
	public boolean checkEmailAuthToken(Long userIdx) {
		User user = userRepository.getOne(userIdx);
		Optional<EmailAuth> emailAuth = emailAuthRepository.findByUserIdx(user);

		if(emailAuth.isPresent()) {
			return false;
		}

		return true;
	}

	@Override
	public void saveEmailAuthToken(Long userIdx, String token) {
		// 1. 조회 -> 이미 발급받은 token이 있는지 db에서 조회
		if(checkEmailAuthToken(userIdx)) {
			// 2-1. db에 결과값이 없으면 새로 입력
			EmailAuth emailAuth = new EmailAuth();
			emailAuth.setUserIdx(userRepository.getOne(userIdx));
			emailAuth.setToken(token);

			emailAuthRepository.save(emailAuth);
		} else {
			// 2-2. db에 결과값이 있으면 token 값 변경
			User user = userRepository.getOne(userIdx);
			EmailAuth emailAuth = emailAuthRepository.findByUserIdx(user).get();
			emailAuth.setToken(token);

			emailAuthRepository.save(emailAuth);
		}
	}

//	@Async
	@Override
	public void sendAuthEmail(Long userIdx, String token) throws MessagingException {
		saveEmailAuthToken(userIdx, token);

		// 이메일 발송
		MimeMessage mimeMessage = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

		User user = userRepository.getOne(userIdx);
		String email = user.getEmailId()+"@"+user.getEmailDomain();

		helper.setTo(email);
		helper.setFrom("Mela!");
		helper.setSubject("[Mela!] 이메일 계정을 인증해주세요");

//		String addr = serverAddress + ":" + serverPort;
		String addr = serverAddress;

		String htmlContent = "<html><body>";
		htmlContent += "<p>"+user.getEmailId()+"님 안녕하세요.</p>";
		htmlContent += "<p>Mela!를 정상적으로 이용하기 위해서는 이메일 인증을 해주세요</p>";
		htmlContent += "<p>아래 링크를 누르시면 인증이 완료됩니다.</p>";
		htmlContent += "<a href=\"http://" + addr + "/api/v1/auth/verify?token=" + token + "\">인증 링크</a>";
		htmlContent += "</body></html>";

		helper.setText(htmlContent, true);

		mailSender.send(mimeMessage);
	}

	/**
	 * 
	 * @param userIdx
	 * @param token
	 * @return true: 인증됨 / false: 인증 안됨
	 */
	@Override
	public boolean verifyEmail(Long userIdx, String token) {
		User user = userRepository.getOne(userIdx);
		Optional<EmailAuth> emailAuth = emailAuthRepository.findByUserIdx(user);

		if(emailAuth.isPresent()) {
			if(emailAuth.get().getToken().equals(token)) {
				try{
					// 토큰 유효성 확인
					JwtTokenUtil.handleError(token);

					// 인증 회원으로 전환
					user.setUserType("auth");
					userRepository.save(user);
					return true;
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}

		return false;
	}

	@Override
	public void sendFindPasswordEmail(Long userIdx, String token) throws MessagingException {
		saveEmailAuthToken(userIdx, token);

		// 이메일 발송
		MimeMessage mimeMessage = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

		User user = userRepository.getOne(userIdx);
		String email = user.getEmailId()+"@"+user.getEmailDomain();

		helper.setTo(email);
		helper.setFrom("Mela!");
		helper.setSubject("[Mela!] 비밀번호 재설정");

		// TODO: 비밀번호 재설정 프론트 주소 입력
//		String addr = "https://localhost:3000/changepassword?token=" + token;

		String addr = "https://i10c201.p.ssafy.io:3000/changepassword?token=" + token;


		String htmlContent = "<html><body>";
		htmlContent += "<p>"+user.getEmailId()+"님 안녕하세요.</p>";
		htmlContent += "<p>아래 링크를 통해 비밀번호를 재설정해주세요</p>";
		htmlContent += "<a href=" + addr + "\">비밀번호 재설정</a>";
		htmlContent += "</body></html>";

		helper.setText(htmlContent, true);

		mailSender.send(mimeMessage);
	}

	@Override
	public void followUser(User nowLoginUser, String userId) {
		User followedUser = userRepository.findByEmailId(userId).get();
		Optional<Follow> isFollowed = followRepository.findByFollowerAndFollowe(nowLoginUser, followedUser);
		Notification notification = new Notification();
		notification.setUserIdx(followedUser);	//알람을 받을 사용자; User 객체 타입

		if(isFollowed.isPresent()){
			isFollowed.get().setFollower(nowLoginUser);
			isFollowed.get().setFollowe(followedUser);
			followRepository.delete(isFollowed.get());

			notification.setAlarmContent(nowLoginUser.getNickname()+"님이 당신을 팔로우 취소 하였습니다.");
		}
		else{
			Follow follow = new Follow();
			follow.setFollower(nowLoginUser);
			follow.setFollowe(followedUser);
			followRepository.save(follow);

			notification.setAlarmContent(nowLoginUser.getNickname()+"님이 당신을 팔로우 하였습니다.");
		}

		notification.setChecked(false);
		notification.setAlarmDate(LocalDateTime.now());
		notificationRepository.save(notification);
	}

	@Override
	public Boolean isFollow(User nowLoginUser, String userId) {
		User followedUser = userRepository.findByEmailId(userId).get();
		Optional<Follow> isFollowed = followRepository.findByFollowerAndFollowe(nowLoginUser, followedUser);
		return isFollowed.isPresent();
	}

	@Override
	public List<User> getFollower(String emailId) {
		return followRepositorySupport.findUserFollower(userRepository.findByEmailId(emailId).get());
	}

	@Override
	public List<User> getFollowee(String emailId) {

		return followRepositorySupport.findUserFollowee(userRepository.findByEmailId(emailId).get());

	}

	@Override
	public List<Notification> getNotification(User nowLoginUser) {
		Optional<List<Notification>> notiList = notificationRepository.findByUserIdx(nowLoginUser);
		if(notiList.isPresent()){
			return notiList.get();
		}
		return null;
	}

	@Override
	public String checkNotification(User nowLoginUser, Long notiId) {
		Optional<Notification> notification = notificationRepository.findByNotificationIdxAndUserIdx(notiId, nowLoginUser);

		if(notification.isPresent()){
			if(!notification.get().getChecked()){
				notification.get().setChecked(true);
				notificationRepository.save(notification.get());
				return "알람을 확인했습니다";
			}else{
				return "이미 확인한 알람입니다";
			}
		}
		else{
			return "알람이 없습니다";
		}
	}

	@Override
	public void deleteNotification(User nowLoginUser, Long notiId) {
		notificationRepository.deleteByNotificationIdxAndUserIdx(notiId, nowLoginUser);
	}

	@Override
	public List<Feed> getFeed(User user) {
		List<Feed> feeds = feedRepositorySupport.getFeed(user);

		return feeds;
	}

	@Override
	public PortfolioAbstract browsePortfolioAbstract(String userId) {
//		return portfolioAbstractRepository.findByUserIdx(userRepository.findByEmailId(userId).get()).get();
		return portfolioAbstractRepository.findByUserIdx(userRepository.findByEmailId(userId).get());
	}

	@Override
	public int isAllowedToBrowsePortfolioAbstract(String userEmail, User targetUser) {
		//1. 조회하려는 사용자가 없는 경우 (잘못된 이메일 아이디)
		if(targetUser == null) {
			return 404;
		}

		//2. 조회하려는 사용자가 searchAllow를 true로 설정해둔 경우
		if(targetUser.getSearchAllow()) {
			return 200;
		}

		//3. 조회하려는 사용자가 searchAllow를 false로 설정해두었지만 로그인한 사용자와 일치한 경우 (내 정보 조회)
		if(userEmail != null && userEmail.equals(userEmail)) {
			return 200;
		}

		//나머지 경우: 조회할 수 없음 (searchAllow false)
		return 403;
	}

	@Override
	public String getUserProfileImage(User user) {
		String userProfileImageURL = null;

		//1. portfolio_abstract 테이블에서 user의 portfolio 가져옴
		try {
			PortfolioAbstract portfolioAbstract = portfolioAbstractRepository.findByUserIdx(user);
			File userProfileImageFile = portfolioAbstract.getPortfolio_picture_file_idx();
			userProfileImageURL = fileService.getImageUrlBySaveFileIdx(userProfileImageFile.getFileIdx());
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			return userProfileImageURL;
		}
	}
}
