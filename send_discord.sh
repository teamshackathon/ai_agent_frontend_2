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
DISCORD_WEBHOOK=$(echo "$DISCORD_WEBHOOK" | tr -d '\r\n' | xargs)
echo "[DEBUG] TRIMMED DISCORD_WEBHOOK: \"$DISCORD_WEBHOOK\""

if [ "$service" = "discord" ]; then
    JSON_FILE="response.json"
    notion_url="https://api.notion.com/v1/databases/$NOTION_DATABASE_ID/query"

    curl -s -X POST \
      -H "Authorization: Bearer $NOTION_API_KEY" \
      -H "Notion-Version: 2022-06-28" \
      -H "Content-Type: application/json" \
      -d "{\"filter\": {\"property\": \"ID\",\"number\": {\"equals\": $number}}}" \
      "$notion_url" > "$JSON_FILE"

    # jqを使って情報を抽出
    task_name=$(jq -r '.results[0].properties.task_name.title[0].plain_text' "$JSON_FILE")
    assignee=$(jq -r '.results[0].properties.assignee.people[0].name' "$JSON_FILE")
    avatar_url=$(jq -r '.results[0].properties.assignee.people[0].avatar_url' "$JSON_FILE")
    task_url=$(jq -r '.results[0].url' "$JSON_FILE")

    timestamp=$(date "+%Y/%m/%d %H:%M")
    color=$((RANDOM % 16777216))

    # 安全なJSON構築
    payload=$(jq -n \
      --arg title "【$message】$task_name" \
      --arg url "$task_url" \
      --arg name "$assignee" \
      --arg icon_url "$avatar_url" \
      --arg text "$timestamp" \
      --argjson color "$color" \
      '{
        embeds: [{
          title: $title,
          color: $color,
          url: $url,
          author: {
            name: $name,
            icon_url: $icon_url
          },
          footer: {
            text: $text
          }
        }]
      }')

    curl -s -H "Content-Type: application/json" -X POST -d "$payload" "$DISCORD_WEBHOOK"

    rm -f "$JSON_FILE"
    echo "[情報] 一時ファイルを削除しました: $JSON_FILE"
fi