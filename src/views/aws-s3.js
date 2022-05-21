import { randomId } from './useful-functions.js';

const s3BucketName = 'kwang-shopping';
const bucketRegion = 'ap-northeast-2'; // 한국은 항상 ap-northeast-2임.
const IdentityPoolId = 'ap-northeast-2:b6a1fa02-993d-437d-9ed5-7134db218241';

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId,
  }),
});

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: s3BucketName },
});

// 아마존 S3에 사진파일 올리는 함수
// fileInputElement: input 요소
// album: S3에서 업로드된 사진파일이 속할 폴더 이름.
async function addImageToS3(fileInputElement, album) {
  // 파일 input 요소에, 사용자가 올린 파일이 있는지 여부 확인
  const files = fileInputElement.files;
  if (!files.length) {
    throw new Error('사진 파일을 업로드해 주세요.');
  }

  // 파일 input 요소에서 사진파일 추출 등 AWS S3로의 업로드 준비
  const file = files[0];
  // 유니크한 사진파일 주소를 만들 수 있게 함.
  const fileName = randomId() + '_' + file.name;
  const albumPhotosKey = encodeURIComponent(album) + '/';
  const photoKey = albumPhotosKey + fileName;

  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: s3BucketName,
      Key: photoKey,
      Body: file,
    },
  });

  // AWS S3에 업로드 진행 -> 성공 시, 업로드된 파일 주소를 반환
  try {
    const uploadedFile = await upload.promise();

    const fileKey = uploadedFile.Key;
    console.log(uploadedFile);
    console.log(
      `AWS S3에 정상적으로 사진이 업로드되었습니다.\n파일 위치: ${fileKey}`
    );

    return fileKey;
  } catch (err) {
    throw new Error(
      `S3에 업로드하는 과정에서 에러가 발생하였습니다.\n${err.message}`
    );
  }
}

function getImageUrl(imageKey) {
  const imageUrl = new Promise((resolve) => {
    const params = {
      Bucket: s3BucketName,
      Key: imageKey,
      Expires: 60,
    };

    s3.getSignedUrl('getObject', params, (_, url) => {
      resolve(url);
    });
  });

  return imageUrl;
}

export { addImageToS3, getImageUrl };
