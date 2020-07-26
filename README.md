# Project EA

© 2018-2020 Dark Tornado, All rights reserved.

<img src="https://raw.githubusercontent.com/DarkTornado/ProjectE/master/PojectEA.png"><br>

### 개요
 - EA는 '에아'라고 읽음.
 - [Project M](https://github.com/DarkTornado/ProjectM)이 대화 기능을 구현하는 것을 목적으로 한다면, Project E는 기타 잡기능(?)들을 구현하는 것을 목적으로 함.
 - Project E에서 E는 봇의 이름인 EA를 의미합니다.
 - 버전명 뒤에 J가 붙어있는 파일들은 [JellyBrick](https://github.com/JellyBrick)님이 만드신 [카카오톡 봇](https://play.google.com/store/apps/details?id=be.zvz.newskbot)에서 사용한다고 가정하고, <b>자바스크립트</b>로 작성한 소스입니다.
 - 버전명 뒤에 D가 붙어있는 파일들은 [Dark Tornado](https://github.com/DarkTornado)가 만든 [카카오톡 봇](https://play.google.com/store/apps/details?id=com.darktornado.kakaobot)([Nusty](https://play.google.com/store/apps/details?id=com.darktornado.nusty)에 내장된 카카오톡 봇 포함)에서 사용한다고 가정하고, <b>자바스크립트</b>로 작성한 소스입니다.
 - 버전명 뒤에 C가 붙어있는 파일들은 [Dark Tornado](https://github.com/DarkTornado)가 만든 [카카오톡 봇](https://play.google.com/store/apps/details?id=com.darktornado.kakaobot)([Nusty](https://play.google.com/store/apps/details?id=com.darktornado.nusty)에 내장된 카카오톡 봇 포함)에서 사용한다고 가정하고, <b>커피스크립트</b>로 작성한 소스입니다.

### 라이선스
 - [GPL 3.0](http://www.gnu.org/licenses/gpl-3.0.html)이 적용됩니다.
 - 따라서, Project E의 소스를 사용하는 경우, 해당 소스가 사용된 프로젝트의 소스코드를 공개해야 합니다.

### 가이드라인
* 소스 사용시 원작자를 밝혀주세요.<br>
 ex) 이 봇은 Dark Tornado의 Project EA 소스를 사용하였습니다.

### 배포용 버전 목록

#### 자바스크립트 버전 (vers. J, vers. D)
- [버전 1.0 J](https://github.com/DarkTornado/ProjectE/blob/master/Project%20EA%201.0%20J.js) (JellyBrick의 카톡봇용)
- [버전 1.0 D](https://github.com/DarkTornado/ProjectE/blob/master/Project%20EA%201.0%20D.js) (Dark Tornado의 카톡봇용)
- [버전 2.0 J](https://github.com/DarkTornado/ProjectE/blob/master/Project%20EA%202.0%20J.js) (JellyBrick의 카톡봇용)
- [버전 2.0 D](https://github.com/DarkTornado/ProjectE/blob/master/Project%20EA%202.0%20D.js) (Dark Tornado의 카톡봇용)
- [버전 3.0](https://github.com/DarkTornado/ProjectE/blob/master/Project%20EA%203.0.js) (버전 3.0부터 통합)

#### 커피스크립트 버전 (vers. C)
- [버전 1.0 C](https://github.com/DarkTornado/ProjectE/blob/master/Project%20EA%201.0%20C.coffee)
- [버전 2.0 C](https://github.com/DarkTornado/ProjectE/blob/master/Project%20EA%202.0%20C.coffee)
- ~~버전 3.0 (개발중)~~

### 명령어 목록
#### 버전 1.0에서 추가
 - /ea 따라하기
 - /ea 파싱 \[URL\]
 - /ea 날씨
 - /ea 호출
 - /ea 번역 \[언어코드1\] \[언어코드2\] \[내용\]
 - /ea 시간
 - /ea on
 - /ea off
 - /ea info
 - /ea help
 
#### 버전 2.0에서 추가
 - /ea 날짜
 - /ea 주사위
 - /ea 미세먼지
 - /ea 검색 \[내용\]

#### 버전 3.0에서 추가
 - /ea 날씨 \[지역\]
 - /ea 비트코인
 - /ea 메이플 \[닉네임\]
 
### 업데이트 내역
#### 버전 1.0
 - 최초 버전 출시.
 - 명령어 10개 지원.
 
#### 버전 2.0
 - 명령어 4개 추가. 총 14개.

#### 버전 3.0
 - 명령어 3개 추가. 총 17개
 - '/ea' 대신 '.ea'로도 사용이 가능하도록 변경.
 - '/날씨' 명령어 내부 구현 변경
 - D 버전이 J 버전으로 통합.
