async function get(endpoint, params = '') {
  const apiUrl = endpoint + '/' + params;
  console.log(`%cGET 요청: ${apiUrl} `, 'color: #a25cd1;');

  const res = await fetch(apiUrl, {
    // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });

  const data = await res.json();

  return data;
}

async function post(endpoint, data) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);
  console.log(`%cPOST 요청: ${endpoint}`, 'color: #296aba;');
  console.log(`%cPOST 요청 데이터: ${bodyData}`, 'color: #296aba;');

  const res = fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: bodyData,
  });

  const result = await res.json();

  return result;
}

async function patch(endpoint, params = '', data) {
  const apiUrl = endpoint + '/' + params;

  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);
  console.log(`%cPUT 요청: ${endpoint}`, 'color: #059c4b;');
  console.log(`%cPUT 요청 데이터: ${bodyData}`, 'color: #059c4b;');

  const res = fetch(apiUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: bodyData,
  });

  const result = await res.json();

  return data;
}

// 아래 함수명에 관해, delete 단어는 자바스크립트의 reserved 단어이기에,
// 여기서는 우선 delete 대신 del로 쓰고 아래 export 시에 delete로 alias 함.
async function del(endpoint, params = '', data = {}) {
  const apiUrl = endpoint + '/' + params;
  const bodyData = JSON.stringify(data);

  console.log(`DELETE 요청 ${apiUrl}`);
  console.log(`DELETE 요청 데이터: ${bodyData}`);

  const res = fetch(apiUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: bodyData,
  });

  const result = await res.json();

  return result;
}

// 아래처럼 export한 후, 다시 index.js에서 export * as Api 로 export하면,
// Api.get, Api.post 로 쓸 수 있음.
export { get, post, patch, del as delete };
