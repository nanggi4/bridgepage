# bridgepage

## Frontend 📍

- html
- javascript (es6)

## Backend 📍

- Node.js
- DynamoDB

## AWS 📍

- lambda
- S3
- ec2
- route53
- apigateway
- DynamoDB

## Explanation
`lambda`와 `DynamoDB`, `S3`를 활용해서 serverless형태로 원하는 페이지를 띄어주는 service 입니다.
해당 페이지의 `html`데이터를 `DynamoDB`에 올려두면 해당 데이터를 기반으로 `S3` 버켓내의 파일로 업로드 하여 도메인에 해당 내용을 랜더링 합니다.
