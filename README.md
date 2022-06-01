# SW2기 프로젝트 I - 쇼핑몰 웹 서비스 구현 예시

<div align='center'>

<img alt="쇼핑-데모 로고" src="https://i.ibb.co/xSZHxmy/image.png">

</div>

<br />

## :rabbit: [서비스 링크](http://shopping-demo.elicecoding.com/)

> [클릭하시면 서비스 페이지로 이동합니다.](http://shopping-demo.elicecoding.com/)

<br />

## :apple: 프로젝트 소개

#### 제품 등록, 장바구니 추가, 주문하기 등 쇼핑몰의 핵심 서비스를 구현합니다. 
1. 회원가입, 로그인, 회원정보 수정 및 탈퇴 등 사용자 관련 CRUD를 할 수 있습니다.
2. 카테고리 관련 CRUD, 제품 관련 CRUD, 주문 관련 CRUD할 할 수 있습니다.
3. 장바구니 관련 기능을 프론트 단에서 수행할 수 있습니다.  
4. 관리자 페이지가 있습니다.

<br />

### :movie_camera: 데모 영상

<details><summary>사용자 관련 CRUD</summary>
<p>
관련 영상 삽입해야 함 
</p>
</details>

<details><summary>카테고리 추가 및 반영</summary>
<p>
관련 영상 삽입해야 함 
</p>
</details>

<details><summary>제품 추가 및 반영</summary>
<p>
관련 영상 삽입해야 함 
</p>
</details>

<details><summary>장바구니 기능</summary>
<p>
관련 영상 삽입해야 함 
</p>
</details>

<details><summary>주문 기능</summary>
<p>
관련 영상 삽입해야 함 
</p>
</details>

<details><summary>관리자 페이지</summary>
<p>
관련 영상 삽입해야 함 
</p>
</details>

<br />

### :page_facing_up: 페이지 별 화면

|  |  |
| ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------|
| ![image](https://i.ibb.co/VSGkvJ5/image.png) | ![image](https://i.ibb.co/mNHH3pB/image.png) |
|                                                메인 페이지 (카테고리별 제품 목록 페이지 이동 링크)                                             |                                                회원가입 화면                                                    |
| ![image](https://i.ibb.co/mNHH3pB/image.png) | ![image](https://i.ibb.co/RgPhRRP/image.png) |
|                                                로그인 페이지                                                |                                                카테고리별 제품 목록 페이지 (여자옷)                                                 |
| ![image](https://i.ibb.co/S67hhtQ/image.png) | ![image](https://i.ibb.co/3hHGhKn/image.png) |
|                                   카테고리별 제품 목록 페이지 (남자옷)                                  |                                                  제품 상세 페이지                                                |
| ![image](https://i.ibb.co/Q6f0G7m/image.png) | ![image](https://i.ibb.co/KDc1xMW/image.png) |
|                                                  장바구니 페이지                                                  |                                                   주문 페이지                                                   |
| ![image](https://i.ibb.co/KDc1xMW/image.png) | ![image](https://i.ibb.co/XsjP6p8/image.png) |
|                                                  주문완료 페이지                                                  |                                                  주문내역 페이지                                                   |
| ![image](https://i.ibb.co/YN6VLKK/image.png) | ![image](https://i.ibb.co/vdZvhMb/image.png) |
|                                                  개인 계정관리 페이지                                                  |                                                  회원정보 수정 페이지                                                   |
| ![image](https://i.ibb.co/0jLxC6m/image.png) | ![image](https://i.ibb.co/162YcXN/image.png) |
|                                                  관리자 괸리 페이지                                                  |                                                  관리자 회원관리 페이지                                                   |
| ![image](https://i.ibb.co/dBzM2Qb/image.png) | ![image](https://i.ibb.co/BzbWx0M/image.png) |
|                                                  관리자 주문관리 페이지                                                  |                                                  관리자 제품추가 페이지                                                   |

<br />


## :hammer_and_wrench: 기술 스택

![image](https://i.ibb.co/TBSZZMj/image.png)

<br />

## :green_book: 아키텍처

![image](https://i.ibb.co/NF7wnPR/image.png)<br />

<br />

## 제작자

![image](https://i.ibb.co/tqhC3zg/image.png)<br />

<br />

## :runner: 로컬 실행 방법

1. 레포지토리를 클론하고자 하는 디렉토리에서 아래 명령어를 수행

   ```
   git clone <레포지토리 주소>
   ```

<br>

2. 클론한 디렉토리에서 backend 디렉토리로 들어가 아래 명령어를 통해 backend에서 필요한 module 설치

   ```
   npm install
   ```

<br>

3. backend에서 필요한 `.env` 설정

- 아래 설명에 따라 환경변수 설정

  ```
  MONGODB_URL=<몽고DB URL>
  MYSQL_URL=<MySQL URL>
  USED_DB='mongodb' 혹은 'mysql'
  PORT=4000
  JWT_SECERT_KEY=<랜덤 문자열>
  GOOGLE_CLIENT_ID=<GCP에서 발급받은 OAuth 2.0 CLIENT ID>
  ```

<br>

4. express 앱을 실행

   ```
   npm run start
   ```

<br>

## API 테스트

> 백엔드 API를 테스트하는 JEST 코드가 tests 폴더에 있습니다. 

   ```
   npm run test
   ```

