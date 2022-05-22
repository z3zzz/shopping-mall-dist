# SW2기 프로젝트 I - 쇼핑몰 웹 서비스 구현 예시

<details><summary style="font-size: 1.3rem;">주제 기획</summary>
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


5. 추가할 기능
- 강제 로그인페이지 이동 시, 로그인 후 되돌아가게
- 페이지 이동 시 자동 input칸 포커스
- 목록으로 돌아가기 버튼
- 주문페이지 -> 장바구니 자동 이동 시, 장바구니도 비어 있으면 다른 페이지로 이동시키기
- form validation 별도 함수로 로직 추출하기
- 주문결제 페이지 등에서, 장바구니 뒤로가기 등 링크 추가
- 장바구니 추가 시 alert에 장바구니 바로가기 추가
- page-not-found redirec 는 replace 로 하기
- input validator 만들기 
- s3 설명 추가 (폴더에)


</p>
</details>
