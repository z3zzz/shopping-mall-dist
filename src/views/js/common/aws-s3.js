import { randomId } from './randomId.js';

const s3BucketName = 'kwang-shopping';
const bucketRegion = 'ap-northeast-2'; // 한국은 항상 ap-northeast-2임.
const IdentityPoolId = 'ap-northeast-2:b6a1fa02-993d-437d-9ed5-7134db218241';

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId,
  }),
});

new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: s3BucketName },
});

// 아마존 S3에 사진파일 올리는 함수
// fileInputId: input 요소의 id
// album: S3에서 업로드된 사진파일이 속할 폴더 이름.
async function addImage(fileInputId, album) {
  // 파일 input 요소에, 사용자가 올린 파일이 있는지 여부 확인
  const files = document.querySelector(`#${fileInputId}`).files;
  if (!files.length) {
    return alert('사진 파일을 업로드해 주세요.');
  }

  // 파일 input 요소에서 사진파일 추출 등 AWS S3로의 업로드 준비
  const file = files[0];
  // 유니크한 사진파일 주소를 만들 수 있게 함.
  const fileName = randomId() + file.name;
  const albumPhotosKey = encodeURIComponent(album) + '/';
  const photoKey = albumPhotosKey + fileName;

  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: s3BucketName,
      Key: photoKey,
      Body: file,
    },
  });

  // AWS S3에 업로드 진행 -> 성공 시, 업로드된 파일 주소 URL을 반환
  try {
    const uploadedFile = await upload.promise();

    return uploadedFile.Location;
  } catch (err) {
    return alert(
      'S3에 업로드하는 과정에서 에러가 발생하였습니다.',
      err.message
    );
  }
}

export { addImage };
