# Node.jsのベースイメージ
FROM node:20.16.0

# 作業ディレクトリの設定
WORKDIR /app

# package.json と package-lock.json をコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm ci

# アプリケーションのコードをコピー
COPY . .

# ポートの設定
EXPOSE 3000

# アプリを起動
CMD ["npm", "run", "start:prod"]
