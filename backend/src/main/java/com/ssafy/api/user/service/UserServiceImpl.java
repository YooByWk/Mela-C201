package com.ssafy.api.user.service;

import org.springframework.stereotype.Service;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {
//	@Autowired
//	UserRepository userRepository;
//
////	@Autowired
////	UserRepositorySupport userRepositorySupport;
//
//	@Autowired
//	PasswordEncoder passwordEncoder;
//
//	@Override
//	public User createUser(UserRegisterPostReq userRegisterInfo) {
//		User user = new User();
//		user.setUserId(userRegisterInfo.getId());
//		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
//		user.setPassword(passwordEncoder.encode(userRegisterInfo.getPassword()));
//		user.setDepartment(userRegisterInfo.getDepartment());
//		user.setName(userRegisterInfo.getName());
//		user.setPosition(userRegisterInfo.getPosition());
//
//		return userRepository.save(user);
//	}
//
//	@Override
//	public User getUserByUserId(String userId) {
//		// 디비에 유저 정보 조회 (userId 를 통한 조회).
////		User user = userRepositorySupport.findUserByUserId(userId).get();
//		User user = userRepository.findByUserId(userId).get();
//		return user;
//	}
//
//	@Override
//	public void loginSaveJwt(String userId, String jwtToken){
////		User user = userRepositorySupport.findUserByUserId(userId).get();
//		User user = userRepository.findByUserId(userId).get();
//		user.setJwtToken(jwtToken);
//
//		System.out.println("jwt " + userId + " jwtToken "+user.getJwtToken());
//
//		userRepository.save(user);
////		userRepositorySupport.loginSaveJwt(userId, jwtToken);
//	}
//
//	@Override
//	public void logoutSaveJwt(String userId) {
////		User user = userRepositorySupport.findUserByUserId(userId).get();
//		User user = userRepository.findByUserId(userId).get();
//		user.setJwtToken(null);
//		userRepository.save(user);
//	}
//
//	@Override
//	public User updateUser(User user, UserUpdatePostReq userUpdateInfo) {
//		user.setPosition(userUpdateInfo.getPosition());
//		user.setName(userUpdateInfo.getName());
//		user.setDepartment(userUpdateInfo.getDepartment());
//
//		return userRepository.save(user);
//	}
//
//	@Override
//	public void deleteUser(User user) {
//		userRepository.delete(user);
////		userRepository.save(user);
//	}
//
//	@Override
//	public boolean idDupCheck(String userId) {
//		if (userRepository.findByUserId(userId).isPresent()) {
//			return false;
//		} else {
//			return true;
//		}
//	}
//
//	@Override
//	public boolean checkPassword(String password, User user) {
//		//입력받은 패스워드를 암호화 하여 DB에 저장된 패스워드와 대조
//		return passwordEncoder.matches(password, user.getPassword());
//	}

}
