"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const DB_URL = process.env.MYSQL_URL ||
    'MySQL 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요. \n.env 파일도 필요합니다.\n';
const sequelize = new sequelize_1.Sequelize(DB_URL);
exports.sequelize = sequelize;
sequelize
    // MySQL 서버 연결 상태를 확인함
    .authenticate()
    // CREATE TABLE IF NOT EXISTS 쿼리를 실행시킴
    .then(() => sequelize.sync())
    .then(() => {
    console.log('\nMysql 서버가 정상적으로 시작되었습니다.');
    console.log(DB_URL);
})
    .catch((err) => {
    console.log('\nMysql 서버 연결에 실패하였습니다..:', err);
    console.log(DB_URL);
});
