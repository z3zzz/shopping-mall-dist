# Shopping Mall

<div>

<img alt="kwang's mall logo" src="https://i.ibb.co/6Pmfr1r/image.png">

</div>

<br />

## 1. Service Link

### http://shopping-mall-kwang.herokuapp.com/

<br />

## 2. Project Info

### 2-1. Shopping mall service
1. User, Category, Product, Order Data CRUD
2. Cart service
3. Admin service

<br />

### 2-2. API Document

#### https://documenter.getpostman.com/view/19463141/Uz5JGurX

<br>

### 2-3. Demo

<details><summary>User Data CRUD</summary>
<p>
관련 영상 삽입해야 함 
</p>
</details>

<details><summary>Category Data CRUD</summary>
<p>
관련 영상 삽입해야 함 
</p>
</details>

<details><summary>Product Data CRUD</summary>
<p>
관련 영상 삽입해야 함 
</p>
</details>

<details><summary>Cart Service</summary>
<p>
관련 영상 삽입해야 함 
</p>
</details>

<details><summary>Order Service</summary>
<p>
관련 영상 삽입해야 함 
</p>
</details>

<details><summary>Admin Service</summary>
<p>
관련 영상 삽입해야 함 
</p>
</details>

<br />

### 2-4. Pages Example

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


## 3. Tech Stack

![image](https://i.ibb.co/TBSZZMj/image.png)

<br />

## 4. Tech Architecture

![image](https://i.ibb.co/NF7wnPR/image.png)<br />

<br />

## 5. Developer

| Name | Position |
| ------ | ------ |
| KwangTaeKim | Front & Back |

<br />

## 6. How to Run this service

1. Clone the code base

```bash
git clone git@github.com:z3zzz/shopping-mall-kwang.git
```

<br>

2. Install packages

```bash
npm install
```

<br>

3. Create `.env` file

- Set Enviroment Variables

```bash
MONGODB_URL=<MongoDB URL>
MYSQL_URL=<MySQL URL>
USED_DB='mongodb' or 'mysql'
PORT=4000
JWT_SECERT_KEY=<Random String>
GOOGLE_CLIENT_ID=<GCP OAuth 2.0 CLIENT ID>
```

<br>

4. Run Express App

```bash
npm run start
```

<br>

## 7. How to run API tests

> Test files are in Tests directory

 ```
 npm run test
 ```

