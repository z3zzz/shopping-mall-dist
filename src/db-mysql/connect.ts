import { Sequelize } from 'sequelize/types';

const database = process.env.MYSQL_DATABASE || 'shopping-temp';
const host = process.env.MYSQL_HOST || 'localhost';
const username = process.env.MYSQ_USERNAME || 'kwang';
const password = process.env.password || '1234';

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Mysql 서버가 정상적으로 시작되었습니다.');
    console.log(`
      데이터베이스: ${database},
      연결대상(host): ${host},
      사용자 이름: ${username}
    `);
  })
  .catch((err) => {
    console.log('Mysql 서버 연결에 실패하였습니다..:', err);
    console.log(`
      데이터베이스: ${database},
      연결대상(host): ${host},
      사용자 이름: ${username}
    `);
  });

export { sequelize };
