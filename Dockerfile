# ビルドステージ - Node.jsの公式イメージを使用
FROM node:24-alpine AS builder

# 作業ディレクトリを設定
WORKDIR /app

# 環境変数をビルド前に設定
ENV NEXT_PUBLIC_API_URL="http://ai-agent-2-backend-service:3004/api/v1"

# パッケージファイルをコピー
COPY package.json package-lock.json* ./

# 依存関係をインストール
RUN npm ci

# ソースをコピー
COPY . .

# Next.jsアプリケーションをビルド
RUN npm run build

# 実行ステージ - 非常に軽量なnode:alpineベースイメージ
FROM node:24-alpine AS runner

WORKDIR /app

# 本番環境のみ
ENV NODE_ENV production

# 非rootユーザーを使用してセキュリティを向上
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# 必要なファイルだけコピー
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./

# 依存関係を production に限定してインストール
RUN npm install --omit=dev

EXPOSE 3000

CMD ["node_modules/.bin/next", "start"]