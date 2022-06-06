let database;

// indexedDB에 연결하고, 연결 성공 시 데이터베이스 객체를
// Promise로 감싸 반환함.
const openDatabase = () => {
  const db = new Promise((resolve, reject) => {
    const onRequest = indexedDB.open("shopping", 1);
    onRequest.onupgradeneeded = () => {
      const database = onRequest.result;

      database.createObjectStore("cart", {
        autoIncrement: true,
      });

      database.createObjectStore("order", {
        autoIncrement: true,
      });
    };

    onRequest.onsuccess = async () => {
      resolve(onRequest.result);
    };

    onRequest.onerror = () => {
      const err = onRequest.error;

      reject(err);
    };
  });

  return db;
};

// indexedDB에 저장된 값을 가져옴
const getFromDb = async (storeName, key = "") => {
  // database 변수가 아직 초기화가 되어있지 않다면,
  // openDatabase 함수를 실행하여 데이터베이스 객체를 할당함.
  if (!database) {
    database = await openDatabase();
  }

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
      const err = getRequest.error;

      reject(err);
    };
  });

  return data;
};

// indexedDB에 저장함
const addToDb = async (storeName, entry, key = "") => {
  // database 변수가 아직 초기화가 되어있지 않다면,
  // openDatabase 함수를 실행하여 데이터베이스 객체를 할당함.
  if (!database) {
    database = await openDatabase();
  }
  const transaction = database.transaction([storeName], "readwrite");
  const store = transaction.objectStore(storeName);

  const result = new Promise((resolve, reject) => {
    // key가 주어졌다면 해당 key로 db에 추가하고,
    // key가 없다면, 기본 설정대로 autoincrement(1, 2, 3 ... 순서)로
    // key를 설정하여 추가함.
    const addRequest = key ? store.add(entry, key) : store.add(entry);

    addRequest.onsuccess = () => {
      resolve();
    };

    addRequest.onerror = () => {
      const err = addRequest.error;

      reject(err);
    };
  });

  return result;
};

// indexedDB의 데이터를 수정함
const putToDb = async (storeName, key, dataModifyFunc) => {
  // database 변수가 아직 초기화가 되어있지 않다면,
  // openDatabase 함수를 실행하여 데이터베이스 객체를 할당함.
  if (!database) {
    database = await openDatabase();
  }

  const transaction = database.transaction([storeName], "readwrite");
  const store = transaction.objectStore(storeName);

  const result = new Promise((resolve, reject) => {
    // 우선 현재 데이터를 가져옴 (데이터 없을 시, 빈 객체 할당)
    const getRequest = store.get(key);

    // 가져온 다음 수정 진행
    getRequest.onsuccess = () => {
      const data = getRequest.result || {};
      // 데이터 수정
      dataModifyFunc(data);

      // 수정한 데이터 삽입
      const putRequest = store.put(data, key);

      putRequest.onsuccess = () => {
        resolve();
      };

      putRequest.onerror = () => {
        const err = putRequest.error;

        reject(err);
      };
    };
  });

  return result;
};

// indexedDB의 데이터를 삭제함
const deleteFromDb = async (storeName, key = "") => {
  // database 변수가 아직 초기화가 되어있지 않다면,
  // openDatabase 함수를 실행하여 데이터베이스 객체를 할당함.
  if (!database) {
    database = await openDatabase();
  }

  const transaction = database.transaction([storeName], "readwrite");
  const store = transaction.objectStore(storeName);

  const result = new Promise((resolve, reject) => {
    // key가 주어졌다면 key에 해당하는 특정 아이템만,
    // key가 없다면 모든 아이템을 삭제함
    const deleteRequest = key ? store.delete(key) : store.clear();

    deleteRequest.onsuccess = () => {
      resolve();
    };

    deleteRequest.onerror = () => {
      const err = deleteRequest.error;

      reject(err);
    };
  });

  return result;
};

export { getFromDb, addToDb, putToDb, deleteFromDb };
