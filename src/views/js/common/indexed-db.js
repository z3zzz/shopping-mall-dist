const onRequest = indexedDB.open('shopping', 1);

onRequest.onupgradeneeded = () => {
  console.log('indexed-db의 업그레이드가 이루어집니다.');
  const database = onRequest.result;

  database.createObjectStore('cart', {
    autoIncrement: true,
  });
};

onRequest.onsuccess = async () => {
  console.log('indexed-db가 정상적으로 시작되었습니다.');
};

onRequest.onerror = () => {
  console.log('indexed-db를 시작하는 과정에서 오류가 발생하였습니다.');
  consolt.log(onRequest.error);
};

const getFromDb = (storeName, key = '') => {
  const database = onRequest.result;
  const transaction = database.transaction([storeName]);
  const store = transaction.objectStore(storeName);

  const data = new Promise((resolve, reject) => {
    // key가 주어졌다면 key에 해당하는 특정 아이템만,
    // key가 없다면 모든 아이템을 가져옴
    const getRequest = key ? store.get(key) : store.getAll();

    getRequest.onsuccess = () => {
      resolve(getRequest.result);
    };

    getRequest.onerror = () => {
      console.log('${storeName}에서 가져오는 과정에서 에러가 발생하였습니다. ');
      console.log(getRequest.error);

      reject(getRequest.error);
    };
  });

  return data;
};

const addToDb = (storeName, entry, key = '') => {
  const database = onRequest.result;
  const transaction = database.transaction([storeName], 'readwrite');
  const store = transaction.objectStore(storeName);

  const result = new Promise((resolve, reject) => {
    // key가 주어졌다면 해당 key로 db에 추가하고,
    // key가 없다면, 기본 설정대로 auto-increment(1, 2, 3 ... 순서)로
    // key를 설정하여 추가함.
    const addRequest = key ? store.add(entry, key) : store.add(entry);

    addRequest.onsuccess = () => {
      console.log(`${storeName}에 정상적으로 추가되었습니다.`);
      resolve();
    };

    addRequest.onerror = () => {
      console.log(`${storeName}에 추가하는데 에러가 발생하였습니다. `);
      console.log(addRequest.error);

      reject(addRequest.error.message);
    };
  });

  return result;
};

const deleteFromDb = (storeName, key = '') => {
  const database = onRequest.result;
  const transaction = database.transaction([storeName], 'readwrite');
  const store = transaction.objectStore(storeName);

  const result = new Promise((resolve, reject) => {
    // key가 주어졌다면 key에 해당하는 특정 아이템만,
    // key가 없다면 모든 아이템을 삭제함
    const deleteRequest = key ? store.delete(key) : store.clear();

    deleteRequest.onsuccess = () => {
      console.log(`${storeName}에서 정상적으로 삭제되었습니다.`);
      resolve();
    };

    deleteRequest.onerror = () => {
      console.log(`${storeName}에서 삭제하는데 에러가 발생하였습니다. `);
      console.log(storeAddRequest.error);

      reject(storeAddRequest.error.message);
    };
  });

  return result;
};

export { getFromDb, addToDb, deleteFromDb };
