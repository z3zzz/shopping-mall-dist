import { Sequelize } from 'sequelize';

const DB_URL =
  process.env.MYSQL_URL ||
  'MySQL 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요. \n.env 파일도 필요합니다.\n';
const sequelize = new Sequelize(DB_URL);

sequelize
  .authenticate()
  .then(() => {
    console.log('\nMysql 서버가 정상적으로 시작되었습니다.');
    console.log(DB_URL);
  })
  .catch((err) => {
    console.log('\nMysql 서버 연결에 실패하였습니다..:', err);
    console.log(DB_URL);
  });

export { sequelize };
