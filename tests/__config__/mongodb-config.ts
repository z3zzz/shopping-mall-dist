import mongoose from 'mongoose';

const currentDB = process.env['MONGODB_URL'];

if (!currentDB) {
  throw new Error(
    'MongoDB 서버 주소가 설정되지 않았습니다.\n테스트를 하기 위해서는 .env 파일이 필요합니다.\n.env파일을 생성 후, MONGODB_URL 환경변수를 로컬 혹은 아틀라스 몽고디비 url 주소로 설정해 주세요.'
  );
}

let testDB: string;

if (currentDB.startsWith('mongodb://')) {
  // 로컬 몽고디비 서버 사용하는 경우
  testDB = currentDB + '--test';
} else {
  // 아틀라스 몽고디비 서버 사용하는 경우
  const urlParts = currentDB.split('?');
  urlParts[0] += '--test';
  testDB = urlParts.join('?');
}

process.env['MONGODB_URL'] = testDB;

async function clearCollection(name: string) {
  await mongoose.connection.dropCollection(name);
  await mongoose.connection.close();
}

export { clearCollection };
