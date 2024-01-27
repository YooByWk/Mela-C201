package com.ssafy.api.user.service;

import com.ssafy.api.user.request.UserRegisterPostReq;
import com.ssafy.api.user.request.UserUpdatePostReq;
import com.ssafy.common.util.CSVParser;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Random;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepository;

	@Autowired
    UserRepositorySupport userRepositorySupport;

	@Autowired
	PasswordEncoder passwordEncoder;

	Random random = new Random();
	CSVParser frontWords = new CSVParser("front_words");
	CSVParser backWords = new CSVParser("back_words");

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

		// boolean은 isXXX으로 getter 만들어짐!!
		user.setSearchAllow(userRegisterInfo.isSearchAllow());

		return userRepository.save(user);
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
	public User updateUser(User user, UserUpdatePostReq userUpdateInfo) {
		// 수정 사항 추가 필요!!
		user.setName(userUpdateInfo.getName());
		user.setNickname(userUpdateInfo.getNickname());
		user.setBirth(userUpdateInfo.getBirth());
		user.setGender(userUpdateInfo.getGender());
		user.setSearchAllow(userUpdateInfo.isSearchAllow());

		System.out.println(userUpdateInfo.isSearchAllow());

		return userRepository.save(user);
	}

	@Override
	public void deleteUser(User user) {
		userRepository.delete(user);
//		userRepository.save(user);
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

	@Override
	public void updatePassword(String password, User user) {
		user.setPassword(passwordEncoder.encode(password));
		userRepository.save(user);
	}

}
