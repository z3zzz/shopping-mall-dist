import { Sequelize } from 'sequelize/types';

const db = process.env.MYSQL_DB_NAME || 'shopping-temp';
const host = process.env.MYSQL_HOST || 'localhost';
const username = process.env.MYSQ_USERNAME || 'kwang';
const password = process.env.password || '1234';

async function startMysqlDatabase() {
  const sequelize = new Sequelize(db, username, password, {
    host,
    dialect: 'mysql',
  });

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startMysqlDatabase();
