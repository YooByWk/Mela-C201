package com.ssafy.api.user.service;

import com.ssafy.api.user.request.PortfolioAbstractPostReq;
import com.ssafy.api.user.request.UserRegisterPostReq;
import com.ssafy.api.user.request.UserUpdatePostReq;
import com.ssafy.db.entity.*;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.util.List;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	User createUser(UserRegisterPostReq userRegisterInfo);

	User getUserByUserIdx(Long userIdx);
	User getUserByEmail(String email);
	User getUserByEmailId(String emailId);
	List<User> getUserByNameOrNickname(String userName, String userNickname);

//	List<User> getUserByNickname(String userNickname);

	User getUserByEmailIdAndEmailDomain(String emailId, String emailDomain);

	void loginSaveJwt(String userId, String jwtToken);
	void logoutSaveJwt(String userId);

	void updateUser(User user, UserUpdatePostReq userUpdateInfo, PortfolioAbstractPostReq portfolioAbstractPostReq, MultipartFile portfolioPicture);

	void deleteUser(User user);

	boolean idDupCheck(String userId);
	boolean checkPassword(String password, User user);
	void updatePassword(String password, User user);

	boolean nicknameDupCheck(String nickName);
	String generateRandomNickname();

	boolean checkEmailAuthToken(Long userIdx);
	void saveEmailAuthToken(Long userIdx, String token);
	void sendAuthEmail(Long userIdx, String token) throws MessagingException;
	boolean verifyEmail(Long userIdx, String token);
	void sendFindPasswordEmail(Long userIdx, String token) throws MessagingException;
	void deleteAuthToken(User user);

	void followUser(User nowLoginUser, String userId);
	Boolean isFollow(User nowLoginUser, String userId);
	List<User> getFollower(String emailId);
	List<User> getFollowee(String emailId);

	List<Notification> getNotification(User nowLoginUser);
	String checkNotification(User nowLoginUser, Long notiId);
	void deleteNotification(User nowLoginUser, Long notiId);

	List<Feed> getFeed(User user);

	PortfolioAbstract browsePortfolioAbstract(String userId);

	int isAllowedToBrowsePortfolioAbstract(String userEmail, User targetUser);

	String getUserProfileImage(User user);
}
