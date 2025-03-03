# Node.jsの公式イメージを使用
FROM node:20.16.0

# 作業ディレクトリの設定
WORKDIR /app

# 依存関係をインストールするために package.json と package-lock.json をコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm ci

# アプリケーションのコードをコピー
COPY . .

# TypeScript をビルド
RUN npm run build

# ポートを開放
EXPOSE 3000

# プロダクション環境でアプリを実行
CMD ["node", "dist/main"]
