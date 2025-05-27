#!/bin/bash
set -e

# .env チェック
if [ ! -f ".env" ]; then
  echo "[エラー] .env ファイルが見つかりません。"
  echo "以下のGoogle Driveよりダウンロードしてください： https://drive.google.com/xxxxx"
  exit 1
fi

# Homebrew の存在チェック
if ! command -v brew &> /dev/null; then
  echo "[エラー] Homebrew が見つかりません。"
  echo "https://brew.sh/ を参照してインストールしてください。"
  exit 1
fi

for cmd in gh; do
  if ! command -v $cmd &> /dev/null; then
    echo "$cmd not found, installing..."
    brew install $cmd
  fi
done

chmod +x pull_request.sh
./pull_request.sh "$@"
