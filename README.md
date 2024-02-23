# :notes: Mela! - 음악 작업을 위한 구인, 공동 작업 플랫폼
![로고](./frontend/src/assets/images/logo.png)

## Mela! 링크 : https://i10c201.p.ssafy.io/
- 테스트 ID : mela@ssafy.com <br>
- 테스트 PW : mela!1234

## 소개 영상 보기 : 

## 프로젝트 진행 기간
2024.01.08(월) ~ 2024.02.16(금)

## :fire: 기획 배경
음악을 이제 막 시작한 아마추어, 신인 뮤지션들을 위해 준비했습니다.<br>
나와 취향이 맞는, 나의 작업에 필요한 포지션의 멤버를 찾을 수 있습니다.<br>
팀 스페이스를 통해 멤버들과 소통과 공동 작업을 지금 바로 시작해보세요.

## :hatching_chick: 개요
Mela!는 メラメラ(메라메라), 일본어로 활활을 뜻하는 의성어입니다.<br>
포트폴리오와 홍보 숏폼 업로드를 통해 다른 사용자들에게 본인을 알리고<br>
마음에 드는 사용자에게 1대 1 채팅을 보내 팀 스페이스에 초대할 수 있습니다.<br>
<br>
기존의 음악 커뮤니티가 구인 위주 / 포트폴리오 위주인 점에 주목하여<br>
멤버 구인과 공동 작업, 포트폴리오 업로드까지 통합 관리 플랫폼을 개발했습니다.

## :blue_heart: 주요 기능
- ### 멤버 구인
  - 사용자가 입력한 선호 장르, 본인 포지션을 기반으로 구인 공고를 추천 받을 수 있습니다.
  - 공고 작성자와 1대 1 채팅을 통해 대화를 나누고 팀 작업을 함께 할 지 생각할 수 있습니다.

<br>

- ### 팀 스페이스
  - 그룹 멤버들이 각자 일정을 공유하거나 수정, 삭제할 수 있습니다.
  - 실시간 화상 채팅으로 소통할 수 있습니다.
  - 작업한 파일을 업로드하고 다운로드 할 수 있습니다.

<br>

- ### 포트폴리오/숏폼 업로드 및 조회
  - 본인의 포트폴리오(음원) 및 홍보 숏폼을 업로드 하여 본인을 알릴 수 있습니다.
  - 다른 사용자의 포트폴리오를 보고 마음에 드는 경우 1대1 채팅을 시작할 수 있습니다.
  - 서로의 숏폼에 좋아요를 누른 경우 채팅방이 생성되고 대화를 시작할 수 있습니다.

## :mag_right: 서비스 화면
### Main

### Teamspace
  - 팀스페이스 생성, 멤버 초대
  - 팀스페이스 정보 조회 및 수정
  - 그룹 일정 등록 및 수정, 삭제
  - 그룹 화상 채팅
  - 파일 공유
  - 온라인 실시간 음원 재생
<img src=./Docs/teammain.PNG>
<img src=./Docs/teamdetail.PNG>
<img src=./Docs/teammanage.PNG>
<img src=./Docs/teamscheduleadd.PNG>
<img src=./Docs/fileupload.PNG>
<img src=./Docs/seq.PNG>

### Gather
  - 구인글 작성
  - 마음에 드는 사용자 1대 1 채팅하기


### Community
  - 자유게시판 글 작성
  - 최신순/조회수/인기순(좋아요수) 정렬 기준
<img src=./Docs/communitylist.PNG>
<img src=./Docs/communitydetail.PNG>


## :key: 주요 기술
### Backend
  - Springboot
  - WebRTC
  - WebSocket
  - JWT Authentication
  - Redis
  - Swagger
  - MySQL
  - Node.js

### Frontend
  - React
  - Axios
  - Sock.js-Client
  - Webstomp-Client
  - Node.js

### Web RTC
  - Openvidu
  - Docker

### Infra
  - AWS EC2
  - AWS S3

### Collaboration
  - Git
  - Notion
  - Jira
  - Mattermost

## :sunglasses: 팀 소개 및 역할
|담당|이름|역할|소감|
|---|---|---|---|
|팀장|강민지|UI/UX 구현, PPT/UCC 제작, UX 디자인|
|FE팀장|유병욱|UI/UX 구현| 처음 접하는 환경에서 기획부터 서비스까지 모두 직접 이루는 과정이 새롭고, 즐거웠습니다.|
|FE|이현비|UI/UX 구현|속상해요|
|BE팀장|최시원|API 설계, 배포|
|BE|김신영|API 설계|
|BE|이현호|API 설계|과정이 즐거웠던 프로젝트로 오래 기억에 남을 것 같습니다.

## :hammer: 프로젝트 산출물
- ### ERD
<img src=./Docs/ERD.png>

- ### 아키텍처 구성도
<img src=./Docs/아키텍처구성도.PNG>

- ### [화면 정의서](https://www.figma.com/file/IX4LHI9096wtPgbeMZF4tr/C201-team-library?type=design&node-id=0%3A1&mode=design&t=ZOYZB5RR2vzpZ1Hh-1)
- ### [요구사항 명세서](https://valuable-flyingfish-5f5.notion.site/4e8269aba1c0414bb997d0a2554833af?pvs=74)
- ### [API 설계](https://valuable-flyingfish-5f5.notion.site/API-aff8baaa08d44954a433ef4645ba6dad)

## :rocket: 프로젝트 전체 스크린샷
### 1. Main
- 로그아웃 상태
<img src=./Docs/Screenshots/1_Main/1_LogoutStatus/1.png>

- 로그인 모달
<img src=./Docs/Screenshots/1_Main/2_LoginModal/1.png>

- 로그인 상태
<img src=./Docs/Screenshots/1_Main/3_LoginStatus/1.png>

### 2. Gather
- 메인 페이지
<img src=./Docs/Screenshots/2_Gather/1_Main/1.png>
<img src=./Docs/Screenshots/2_Gather/1_Main/2.png>
<img src=./Docs/Screenshots/2_Gather/1_Main/3.png>

  ```plaintext
  "내가 작성한 공고", "내가 선호할 만한 사람", "나를 찾는 공고" 로 구성
  ```

- 프로필 수정
<img src=./Docs/Screenshots/2_Gather/2_EditProfile/1.png>
기존: R&B, Disco, Jazz<br/><br/>
<img src=./Docs/Screenshots/2_Gather/2_EditProfile/2.png>
변경: Jazz, Pop, Rock<br/><br/>
<img src=./Docs/Screenshots/2_Gather/2_EditProfile/3.png>
변경 대화상자<br/><br/>
<img src=./Docs/Screenshots/2_Gather/2_EditProfile/4.png>
수정된 정보

  ```plaintext
  이름, 닉네임, 자기소개, 성별, 생년월일, 좋아하는 장르, 희망하는 포지션, SNS 주소 (인스타그램, 유튜브) 수정 가능
  ```

  > 💡 좋아하는 장르와 희망하는 포지션으로 Gather 메뉴에서 나를 찾는 공고와 쇼츠가 출력됨

- 내가 작성한 공고
<img src=./Docs/Screenshots/2_Gather/3_GatherWrittenByMe/1.png>

- 나를 찾는 공고
<img src=./Docs/Screenshots/2_Gather/4_GatherLookingForMe/1.png>
<img src=./Docs/Screenshots/2_Gather/4_GatherLookingForMe/2.png>
<img src=./Docs/Screenshots/2_Gather/4_GatherLookingForMe/3.png>
<img src=./Docs/Screenshots/2_Gather/4_GatherLookingForMe/4.png>

  | <img src=./Docs/Screenshots/2_Gather/4_GatherLookingForMe/5.png> | 
  |:--:| 
  | 멜라멜라 사용자 메시지 전송 |

  | <img src=./Docs/Screenshots/2_Gather/4_GatherLookingForMe/6.png> | 
  |:--:| 
  | 나는짱이요 사용자 메시지 수신 |

- 채팅
<img src=./Docs/Screenshots/2_Gather/5_Message/1.png>

  ```plaintext
  [다른 사람과 채팅 방법]
  1. 다른 사람이 작성한 구인 글에서 "채팅 연결" 버튼 클릭
  2. 통합 검색에서 사용자 검색 후 "채팅하기" 버튼 클릭
  3. Matching (쇼츠) 메뉴에서 서로 좋아요를 클릭한 경우 서로에게 메시지 전송됨 (시스템 기능)
  ```

- Matching
![](./Docs/Screenshots/2_Gather/6_Matching/1.mp4)

  ```plaintext
  다른 사용자가 업로드한 쇼츠
  1) 선호하는 장르와 희망하는 포지션에 맞는 쇼츠 리스트 재생
  2) 좋아요를 누르면 업로더에게 알림 전송
  3) 싫어요를 누르면 해당 영상이 다시 목록에 보이지 않음
  ```

### 3. Team Space
- Team Space 생성
  | <img src=./Docs/Screenshots/3_TeamSpace/1_CreateTeamSpace/1.png> | 
  |:--:| 
  | Create 버튼 클릭 |

  | <img src=./Docs/Screenshots/3_TeamSpace/1_CreateTeamSpace/2.png> | 
  |:--:| 
  | 배경 이미지, 프로필 이미지, 프로젝트 (팀 스페이스)의 종료일, 팀 스페이스 이름과 설명 입력 |

  | <img src=./Docs/Screenshots/3_TeamSpace/1_CreateTeamSpace/3.png> | 
  |:--:| 
  | Create 버튼 클릭 |

  | <img src=./Docs/Screenshots/3_TeamSpace/1_CreateTeamSpace/4.png> | 
  |:--:| 
  | 생성 완료 대화상자 |

  | <img src=./Docs/Screenshots/3_TeamSpace/1_CreateTeamSpace/5.png> | 
  |:--:| 
  | 팀 스페이스 메인 화면 |

- 일정 추가
  | <img src=./Docs/Screenshots/3_TeamSpace/2_Team/1_Schedule/1.png> | 
  |:--:| 
  | + 버튼 클릭 |

  | <img src=./Docs/Screenshots/3_TeamSpace/2_Team/1_Schedule/2.png> | 
  |:--:| 
  | 내용, 장소, 시작일, 종료일 입력 |

  | <img src=./Docs/Screenshots/3_TeamSpace/2_Team/1_Schedule/3.png> | 
  |:--:| 
  | Create 버튼 클릭 |

  | <img src=./Docs/Screenshots/3_TeamSpace/2_Team/1_Schedule/4.png> | 
  |:--:| 
  | 더보기 버튼 클릭 |

  | <img src=./Docs/Screenshots/3_TeamSpace/2_Team/1_Schedule/5.png> | 
  |:--:| 
  | 일정 세부 내용 확인 |

- 일정 수정
  | <img src=./Docs/Screenshots/3_TeamSpace/2_Team/1_Schedule/4.png> | 
  |:--:| 
  | 더보기 버튼 클릭 |

  | <img src=./Docs/Screenshots/3_TeamSpace/2_Team/1_Schedule/6.png> | 
  |:--:| 
  | 수정 버튼 클릭 |

  | <img src=./Docs/Screenshots/3_TeamSpace/2_Team/1_Schedule/7.png> | 
  |:--:| 
  | 수정 후 Save 버튼 클릭 |

  | <img src=./Docs/Screenshots/3_TeamSpace/2_Team/1_Schedule/8.png> | 
  |:--:| 
  | 수정된 일정 확인 |

- 멤버 추가
  | <img src=./Docs/Screenshots/3_TeamSpace/2_Team/2_InviteMember/1.png> | 
  |:--:| 
  | Invite 클릭 |

  | <img src=./Docs/Screenshots/3_TeamSpace/2_Team/2_InviteMember/2.png> | 
  |:--:| 
  | 초대할 사용자의 닉네임 검색 |

  | <img src=./Docs/Screenshots/3_TeamSpace/2_Team/2_InviteMember/3.png> | 
  |:--:| 
  | 닉네임 검색 후 체크박스 선택 |

  | <img src=./Docs/Screenshots/3_TeamSpace/2_Team/2_InviteMember/4.png> | 
  |:--:| 
  | 닉네임 검색 후 체크박스 선택 |

  | <img src=./Docs/Screenshots/3_TeamSpace/2_Team/2_InviteMember/5.png> | 
  |:--:| 
  | Save 버튼 클릭 |

  | <img src=./Docs/Screenshots/3_TeamSpace/2_Team/2_InviteMember/6.png> | 
  |:--:| 
  | 초대된 멤버 확인 |

- 화상 회의

  ![](./Docs/Screenshots/3_TeamSpace/2_Team/3_VideoConferencing/1.mp4)

- 건반 (비행기(동요) 연주)

  ![](./Docs/Screenshots/3_TeamSpace/3_AudioFile/1_Keyboard/1.mp4)

- 온라인 음원 재생 (개똥벌레(노래) MIDI 재생)

  ![](./Docs/Screenshots/3_TeamSpace/3_AudioFile/2_MIDIPlayback/1.mp4)

- 파일 업로드
  | <img src=./Docs/Screenshots/3_TeamSpace/4_Files/1.png> | 
  |:--:| 
  | Upload 버튼 클릭 |

  | <img src=./Docs/Screenshots/3_TeamSpace/4_Files/2.png> | 
  |:--:| 
  | 파일 업로드 및 설명 작성 |

  | <img src=./Docs/Screenshots/3_TeamSpace/4_Files/3.png> | 
  |:--:| 
  | 업로드 버튼 클릭 |

  | <img src=./Docs/Screenshots/3_TeamSpace/4_Files/4.png> | 
  |:--:| 
  | 업로드 완료 대화상자 |

  | <img src=./Docs/Screenshots/3_TeamSpace/4_Files/5.png> | 
  |:--:| 
  | 업로드된 파일 확인 |

- 파일 다운로드
  | <img src=./Docs/Screenshots/3_TeamSpace/4_Files/6.png> | 
  |:--:| 
  | 다운로드 아이콘 클릭 |

  | <img src=./Docs/Screenshots/3_TeamSpace/4_Files/7.png> | 
  |:--:| 
  | 다운로드 대화상자 |

- 팀 스페이스 관리
  | <img src=./Docs/Screenshots/3_TeamSpace/5_Management/1.png> | 
  |:--:| 
  | Management 클릭 |

  | <img src=./Docs/Screenshots/3_TeamSpace/5_Management/2.png> | 
  |:--:| 
  | 팀 스페이스 기본 정보 수정 |

  | <img src=./Docs/Screenshots/3_TeamSpace/5_Management/3.png> | 
  |:--:| 
  | Save 버튼 클릭 |

  | <img src=./Docs/Screenshots/3_TeamSpace/5_Management/4.png> | 
  |:--:| 
  | 수정 완료 대화상자 |

### 4. 공통 (알림)
- 알림 화면
  | <img src=./Docs/Screenshots/4_Common/1_Sidebar/1_MarkAllAsRead/1.png> | 
  |:--:| 
  | + 버튼 클릭 |

- 알림 읽음으로 표시
  | <img src=./Docs/Screenshots/4_Common/1_Sidebar/1_MarkAllAsRead/2.png> | 
  |:--:| 
  | 체크박스 선택 후 Mark all as read 버튼 클릭 |

  | <img src=./Docs/Screenshots/4_Common/1_Sidebar/1_MarkAllAsRead/3.png> | 
  |:--:| 
  | "읽지 않음"에서 "읽음" 으로 상태 변경 |

- 알림 삭제
  | <img src=./Docs/Screenshots/4_Common/1_Sidebar/2_Delete/1.png> | 
  |:--:| 
  | 체크박스 선택 후 Delete 버튼 클릭 |

  | <img src=./Docs/Screenshots/4_Common/1_Sidebar/2_Delete/2.png> | 
  |:--:| 
  | 알림 삭제 확인 대화상자 |

  | <img src=./Docs/Screenshots/4_Common/1_Sidebar/2_Delete/3.png> | 
  |:--:| 
  | 알림 삭제 확인 |

- All 탭, Unread 탭
  | <img src=./Docs/Screenshots/4_Common/1_Sidebar/3_AllUnreadTab/1.png> | 
  |:--:|
  | All 탭 (모든 (읽지 않음, 읽음 상태인) 알림 출력) |

  | <img src=./Docs/Screenshots/4_Common/1_Sidebar/3_AllUnreadTab/2.png> | 
  |:--:| 
  | Unread 탭 (읽지 않은 상태인 알림 출력) |

- 다른 사용자가 내가 업로드 한 쇼츠에 좋아요를 클릭하면 알림 수신
  <img src=./Docs/Screenshots/4_Common/2_ShortsLikeNotification/1.png>

- 쇼츠 업로더 두 명이 서로의 쇼츠에 좋아요를 누른 경우 (채팅방 개설) #매칭 기능

  | <img src=./Docs/Screenshots/4_Common/3_ShortsMutualLike/1.png> | 
  |:--:| 
  | Message 탭 클릭 |

  | <img src=./Docs/Screenshots/4_Common/3_ShortsMutualLike/2.png> | 
  |:--:| 
  | 채팅하고 싶은 (서로의 쇼츠에 좋아요를 누른) 상대의 닉네임 클릭 |

  | <img src=./Docs/Screenshots/4_Common/3_ShortsMutualLike/3.png> | 
  |:--:| 
  | 채팅 시작 |

### 5. 커뮤니티
- 글 작성
  | <img src=./Docs/Screenshots/5_Community/1_WriteArticle/1.png> | 
  |:--:| 
  | 글쓰기 버튼 클릭 |

  | <img src=./Docs/Screenshots/5_Community/1_WriteArticle/2.png> | 
  |:--:| 
  | 제목 및 내용 입력 |

  | <img src=./Docs/Screenshots/5_Community/1_WriteArticle/3.png> | 
  |:--:| 
  | 저장 버튼 클릭 |

  | <img src=./Docs/Screenshots/5_Community/1_WriteArticle/4.png> | 
  |:--:| 
  | 작성된 글 확인 |

- 글 보기
  <img src=./Docs/Screenshots/5_Community/2_ReadArticle/1.png>

- 글 수정
  | <img src=./Docs/Screenshots/5_Community/3_ModifyArticle/1.png> | 
  |:--:| 
  | 수정 버튼 클릭 |

  | <img src=./Docs/Screenshots/5_Community/3_ModifyArticle/2.png> | 
  |:--:| 
  | 제목 및 본문 내용 수정 후 수정 버튼 클릭 |

  | <img src=./Docs/Screenshots/5_Community/3_ModifyArticle/3.png> | 
  |:--:| 
  | 수정된 글 확인 |

- 글 삭제
  | <img src=./Docs/Screenshots/5_Community/4_DeleteArticle/1.png> | 
  |:--:| 
  | 삭제 버튼 클릭 |

  | <img src=./Docs/Screenshots/5_Community/4_DeleteArticle/2.png> | 
  |:--:| 
  | 글 삭제 확인 대화상자 |

  | <img src=./Docs/Screenshots/5_Community/4_DeleteArticle/3.png> | 
  |:--:| 
  | 글 삭제 후 글 목록으로 이동 |

- 댓글 작성
  | <img src=./Docs/Screenshots/5_Community/5_WriteComment/1.png> | 
  |:--:| 
  | 댓글을 작성할 글 이동 |

  | <img src=./Docs/Screenshots/5_Community/5_WriteComment/2.png> | 
  |:--:| 
  | 댓글 입력 후 등록 클릭 |

  | <img src=./Docs/Screenshots/5_Community/5_WriteComment/3.png> | 
  |:--:| 
  | 작성된 댓글 확인 |

- 댓글 삭제
  <img src=./Docs/Screenshots/5_Community/6_DeleteComment/1.gif>

- 글 정렬 (최신 순, 조회수 순, 인기 순)
  | <img src=./Docs/Screenshots/5_Community/7_SortArticle/1.png> | 
  |:--:| 
  | 기본 정렬: 최신순 |

  | <img src=./Docs/Screenshots/5_Community/7_SortArticle/2.png> | 
  |:--:| 
  | 최신순 정렬 |

  | <img src=./Docs/Screenshots/5_Community/7_SortArticle/3.png> | 
  |:--:| 
  | 조회수순 정렬 |

  | <img src=./Docs/Screenshots/5_Community/7_SortArticle/4.png> | 
  |:--:| 
  | 인기순 정렬 |

- 글 좋아요
  <img src=./Docs/Screenshots/5_Community/8_LikeArticle/1.png>

- 게시글 검색
  | <img src=./Docs/Screenshots/5_Community/9_SearchArticle/1.png> | 
  |:--:| 
  | 검색 창 클릭 |

  | <img src=./Docs/Screenshots/5_Community/9_SearchArticle/2.png> | 
  |:--:| 
  | 검색어 입력 |

  | <img src=./Docs/Screenshots/5_Community/9_SearchArticle/3.png> | 
  |:--:| 
  | 검색 결과 |

### 6. 통합 검색
- 사용자
  | <img src=./Docs/Screenshots/6_IntegratedSearch/1_User/1.png> | 
  |:--:| 
  | 검색어 입력 |

  | <img src=./Docs/Screenshots/6_IntegratedSearch/1_User/2.png> | 
  |:--:| 
  | 검색된 사용자 클릭 |

  | <img src=./Docs/Screenshots/6_IntegratedSearch/1_User/3.png> | 
  |:--:| 
  | 사용자의 프로필 및 포트폴리오 조회 |

- 구인글
  | <img src=./Docs/Screenshots/6_IntegratedSearch/2_Gather/1.png> | 
  |:--:| 
  | 검색어 입력 |

  | <img src=./Docs/Screenshots/6_IntegratedSearch/2_Gather/2.png> | 
  |:--:| 
  | 검색된 구인글 클릭 |

  | <img src=./Docs/Screenshots/6_IntegratedSearch/2_Gather/3.png> | 
  |:--:| 
  | 구인글 조회 |

- 커뮤니티
  | <img src=./Docs/Screenshots/6_IntegratedSearch/3_Community/1.png> | 
  |:--:| 
  | 검색어 입력 |

  | <img src=./Docs/Screenshots/6_IntegratedSearch/3_Community/2.png> | 
  |:--:| 
  | 검색된 게시글 클릭 |

  | <img src=./Docs/Screenshots/6_IntegratedSearch/3_Community/3.png> | 
  |:--:| 
  | 게시글 조회 |

### 7. 회원가입
- 메인 페이지
  | <img src=./Docs/Screenshots/7_SignUp/1.png> | 
  |:--:| 
  | Sign Up 버튼 클릭 |

  | <img src=./Docs/Screenshots/7_SignUp/2-1.png> | 
  |:--:| 
  | 비밀번호와 비밀번호 확인 불일치 |

  | <img src=./Docs/Screenshots/7_SignUp/2-2.png> | 
  |:--:| 
  | 비밀번호와 비밀번호 확인 일치 |

  | <img src=./Docs/Screenshots/7_SignUp/3.png> | 
  |:--:| 
  | 폼 입력 |

  | <img src=./Docs/Screenshots/7_SignUp/4.png> | 
  |:--:| 
  | 이메일 인증 페이지 (회원가입 후 서비스 이용에 인증 필요) |

  | <img src=./Docs/Screenshots/7_SignUp/5.png> | 
  |:--:| 
  | 메일 확인 (링크 클릭) |

  | <img src=./Docs/Screenshots/7_SignUp/6.png> | 
  |:--:| 
  | 인증됨 |
