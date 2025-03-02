# lifestyle-home-search-backend

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

### envファイルの設定
「.env.example」をコピーして，「.env」というファイルを作成

### Docker インストール
- docker install : https://docs.docker.com/engine/install/ubuntu/
- docker compose install : https://docs.docker.com/compose/install/linux/

### 開発サーバ起動
```bash
コンテナ起動
$ docker-compose up -d 
```

```bash
コンテナ内に入る
$ docker-compose exec app bash
```
（コンテナ内で）以下を順に実行
```bash
依存モジュールインストール
$ npm install
データベース構築
$ npm run typeorm -- migration:run
./public/data.csvをデータベースに反映
$ npm run import:csv

```

### APIテスト
#### 認証（アクセストークン取得）
Bearerで認証機能を実装しているため，各APIを実行するためにBearer Tokenが必要

以下のようにsignUpのAPIを実行し，ユーザを登録し，アクセストークを取得
```bash
curl -X POST http://localhost:3000/auth/signUp
-H "Content-Type: application/json"
-d '{
  "username": "testuser",
  "email": "testuser@example.com",
  "password": "password"
}'
```

レスポンス例
```bash
{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ0ZXN0dXNlciIsImlhdCI6MTc0MDkxNzc0NCwiZXhwIjoxNzQwOTIxMzQ0fQ.JhtjSyLc9kqoedJfaO9kJuH6rtBDnh6dhNOBfcV1xgs"}
```

すでにユーザがある場合はログイン
```bash
curl -X POST "http://localhost:3000/auth/login" \
     -H "Content-Type: application/json" \
     -d '{
           "username": "testuser",
           "password": "password"
         }'
```


#### トークンを使用してAPI実行
取得したアクセストークンを以下に記述して，GET /users/meを実行テスト
```bash
curl -X GET "http://localhost:3000/users/me"
  -H "Content-Type: application/json"
  -H "Authorization: Bearer [ここにアクセストークンを記述]"
```

レスポンス例
```bash
{"id":2,"name":"testuser","email":"testuser@example.com","created_at":"2025-03-02T12:15:44.334Z","updated_at":"2025-03-02T12:15:44.334Z"}
```

