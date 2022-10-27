## 1. 프로젝트 정보

데이터베이스 설계 및 Restful API 개발 - 사용자 참여 기반 중고거래 E-Commerce 플랫폼

<br />

## 2. 프로젝트 구성

### 2-1. 사용자 참여형 중고거래 플랫폼
1. User, Category, Product, Order Data CRUD
2. Cart service
3. Admin service

<br />

### 2-2. API 문서

#### https://documenter.getpostman.com/view/19463141/Uz5JGurX

<br />

### 2-3. 페이지 예시

|  |  |
| ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------|
| ![image](https://i.ibb.co/VSGkvJ5/image.png) | ![image](https://i.ibb.co/mNHH3pB/image.png) |
|                                                Main Page                                              |                                                                                Register Page                                                    |
| ![image](https://i.ibb.co/mNHH3pB/image.png) | ![image](https://i.ibb.co/RgPhRRP/image.png) |
|                                                Login Page                                               |                                                Product List page (Women Clothes)                                                 |
| ![image](https://i.ibb.co/S67hhtQ/image.png) | ![image](https://i.ibb.co/3hHGhKn/image.png) |
|                                   Product List page (Men Clothes)                                          |                                                  Product Detail List                                              |
| ![image](https://i.ibb.co/Q6f0G7m/image.png) | ![image](https://i.ibb.co/KDc1xMW/image.png) |
|                                                  Cart Page                                                 |                                                   Order Page                                             |
| ![image](https://i.ibb.co/KDc1xMW/image.png) | ![image](https://i.ibb.co/XsjP6p8/image.png) |
|                                                  Order Complete Page                                               |                                                  Order List Page                                                 |
| ![image](https://i.ibb.co/YN6VLKK/image.png) | ![image](https://i.ibb.co/vdZvhMb/image.png) |
|                                                  Personal Page                                                  |                                                  Personal Security Page                                               |
| ![image](https://i.ibb.co/0jLxC6m/image.png) | ![image](https://i.ibb.co/162YcXN/image.png) |
|                                                  Admin Page                                             |                                                  Admin User List Page           |
| ![image](https://i.ibb.co/dBzM2Qb/image.png) | ![image](https://i.ibb.co/BzbWx0M/image.png) |
|                                                  Admin Order List Page                                                  |                                                  Admin Product Add Page                                                  |

<br />


## 3. 기술 스택

![image](https://i.ibb.co/TBSZZMj/image.png)

<br />

## 4. 아키텍쳐

![image](https://i.ibb.co/NF7wnPR/image.png)<br />

<br />

## 5. 개발자

| Name | Position |
| ------ | ------ |
| 김광태 | Front-End & Back-End |

<br />

## 6. 실행 방법

1. git clone

```terminal
git clone git@github.com:z3zzz/shopping-mall-kwang.git
```

<br>

2. 패키지 설치

```terminal
npm install
```

<br>

3. .env 파일 생성

- Set Enviroment Variables

```terminal
MONGODB_URL=<MongoDB URL>
MYSQL_URL=<MySQL URL>
USED_DB='mongodb' or 'mysql'
PORT=4000
JWT_SECERT_KEY=<Random String>
GOOGLE_CLIENT_ID=<GCP OAuth 2.0 CLIENT ID>
```

<br>

4. 프로그램 실행

```terminal
npm run start
```

<br>

## 7. 테스트 실행

> tests 폴더 파일 

 ```terminal
 npm run test
 ```

