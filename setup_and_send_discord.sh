#!/bin/bash
set -e

# .env チェック
if [ ! -f ".env" ]; then
  echo "[エラー] .env ファイルが見つかりません。"
  echo "以下のGoogle Driveよりダウンロードしてください： https://drive.google.com/xxxxx"
  exit 1
fi

# 依存ツールの確認とインストール
for cmd in gh jq curl; do
  if ! command -v $cmd &> /dev/null; then
    echo "$cmd not found, installing..."
    brew install $cmd
  fi
done

chmod +x send_discord.sh
./send_discord.sh "$@"
