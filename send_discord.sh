#!/bin/bash

set -e

service="$1"
message="$2"

# メッセージから数字を抽出 (AAGC2-123_タイトル の形式)
number=$(echo "$message" | sed -nE 's/.*-([0-9]+)_.*/\1/p')

if [ -z "$number" ]; then
    echo "[警告] メッセージから数字を抽出できませんでした: $message"
    exit 1
fi

if [ ! -f ".env" ]; then
    echo "[エラー] .envファイルが見つかりません。"
    echo "以下のGoogle Driveよりenvをダウンロードしてください： https://drive.google.com/xxxxx"
    exit 1
fi

# .envを読み込む
export $(grep -v '^#' .env | xargs)

if [ "$service" = "discord" ]; then
    JSON_FILE="response.json"
    url="https://api.notion.com/v1/databases/$NOTION_DATABASE_ID/query"

    curl -X POST \
      -H "Authorization: Bearer $NOTION_API_KEY" \
      -H "Notion-Version: 2022-06-28" \
      -H "Content-Type: application/json" \
      -d "{\"filter\": {\"property\": \"ID\",\"number\": {\"equals\": $number}}}" \
      "$url" > "$JSON_FILE"

    # jqを使って情報を抽出
    task_name=$(jq -r '.results[0].properties.task_name.title[0].plain_text' "$JSON_FILE")
    assignee=$(jq -r '.results[0].properties.assignee.people[0].name' "$JSON_FILE")
    avatar_url=$(jq -r '.results[0].properties.assignee.people[0].avatar_url' "$JSON_FILE")
    url=$(jq -r '.results[0].url' "$JSON_FILE")

    timestamp=$(date "+%Y/%m/%d %H:%M")
    color=$((RANDOM % 16777216))

    curl -H "Content-Type: application/json" -X POST -d "{\"embeds\":[{\"title\": \"【$message】$task_name\",\"color\":\"$color\",\"url\":\"$url\",\"author\": {\"name\": \"$assignee\",\"icon_url\": \"$avatar_url\"},\"footer\": {\"text\": \"$timestamp\"}}]}" "$DISCORD_WEBHOOK"

    rm -f "$JSON_FILE"
    echo "[情報] 一時ファイルを削除しました: $JSON_FILE"
fi