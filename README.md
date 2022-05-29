# SW2기 프로젝트 I - 쇼핑몰 웹 서비스 구현 예시

<details><summary>주제 기획</summary>
<p>

1. **아임웹과의 협업**
    - 아임웹 제안 주제 - 쇼핑몰 구축 프로젝트
        
        ## 요약
        
        2-30대를 위한 패션 쇼핑몰 사이트 구축
        
        ## 프로젝트 시간
        
        4 week
        
        ## 팀 사항
        
        최대 5명 (ex. frontend 2, backend 2, PM 1)
        
        ## 요구사항
        
        - 2-30대 고객에게 의류를 판매하는 쇼핑몰 사이트 구축
        - 디자인 같은 경우, 외부 component를 참고할 수 있음
        - 기능
            - 회원 가입
                - 이메일 인증 (가입 시 입력한 이메일로 특정 값 전송 후 해당 키로 가입인증)
                - 소셜 로그인 (ex. 구글,네이버,카카오) => 토큰관리
            - 로그인
                - 로그인 & 로그아웃
            - (고객) 회원 관리
                - 회원 관리 페이지 (ex. 정보수정, 주소 연동 부분(도로명 주소), 프로필 사진)
            - (관리자) 회원 관리
                - 회원 데이터 CRUD
                    - 회원 상세페이지
                        - 수동 생성
                        - 수동 삭제
                        - 수동 업데이트
                        - 수동 읽기
                    - 주문 정보, 장바구니 정보 관리
            - 상품 등록 및 관리
                - (고객) 상품 목록 페이지 (등록된 상품을 목록으로 표시하는 페이지)
                    - 한 페이지에 들어가는 상품이 많을 경우, 표현 방식은 자유 (ex. 페이징 혹은 더보기)
                - (고객) 상품 목록 페이지 (등록된 상품을 목록으로 표시하는 페이지)
                    - 한 페이지에 들어가는 상품이 많을 경우, 표현 방식은 자유 (ex. 페이징 혹은 더보기)
                    - 상품 통합 검색 혹은 카테고리 분류
                - (고객) 상품 상세 페이지
                    - 상품을 클릭했을 경우 상품의 자세한 내용을 보여주는 상세  (ex. 모달 혹은 새로운 페이지)
                    - 장바구니 추가
                    - 상품 주문 구현
                - (관리자) 상품 관리 페이지
                    - 상품 주문, 상품 취소
                    - 위 동작 고객에게 알림 메일
            - 장바구니
                - 장바구니에 들어있는 상품 목록 보기 ( DB 사용 하지 않음 )
                - 장바구니 상품 삭제 기능 ( 개별 삭제, 일괄 삭제, 전체 삭제 )
                - 결제 버튼을 클릭하면 결제 알림이 쇼핑몰 관리자에게 이메일로 전달
            - DB
                - 위 기능을 토대로 관계형 DBMS 형성 및 INDEXING
        
        ## 사용 기술
        
        - 언어: PHP, JavaScript (e.g. React framework, NodeJS platform), Python, Java 등 원하는 언어
        - 쇼핑몰 솔루션: 아임웹 등의 쇼핑몰 솔루션을 사용하지 않고 구현
        - 데이터베이스: MySQL, Oracle, PostgreSQL 중 자유 선택
        - 클라우드 서비스: AWS, Google Cloud 중 자유 선택
        - 피그마, Adobe XD, 스케치 등
        
        ## 평가 항목
        
        - 사이트 기능의 완성도: 기능이 버그 없이 예상대로 동작하는지의 여부
        - 코드 퀄리티: 다른 사람이 코드를 읽고 쉽게 이해할 수 있는지 여부
        - (추가 점수) 배포/테스트 환경 퀄리티: 유닛 테스트/UI 기능 테스트의 자동화, continuous build/continuous test 설치
        - (추가 점수) 상품 구매시, 오픈 API를 통해서 구매버튼 생성

2. fontawesome kit code
<script src="https://kit.fontawesome.com/7630448495.js" crossorigin="anonymous"></script>

3. aws s3 access (temp)
```jsx
const albumBucketName = 'kwang-shopping';
const bucketRegion = 'ap-northeast-2';
const IdentityPoolId = 'ap-northeast-2:b6a1fa02-993d-437d-9ed5-7134db218241';
```

4. Google OAuth
```bash
Client ID: 781560730462-8jb80an9eu02nalbk5a2u27p7tvfvl94.apps.googleusercontent.com
Client Secret: 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

```

</p>
</details>

<br />

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
   git clone [레포지토리 주소]
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
  MONGODB_URL=[몽고DB URL]
  MYSQL_URL=[MySQL URL]
  USED_DB='mongodb' 혹은 'mysql'
  PORT=4000
  JWT_SECERT_KEY=[개인이 설정할 JWT 시크릿키]
  GOOGLE_CLIENT_ID=[GCP에서 발급받은 OAuth 2.0 CLIENT ID]*
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

