#!/bin/bash

set -e

service="$1"
message="$2"

# メッセージから数字を抽出 (例: AAGC2-29_auth-guard)
number=$(echo "$message" | sed -nE 's/.*-([0-9]+)_.*/\1/p')

if [ -z "$number" ]; then
    echo "[警告] メッセージから数字を抽出できませんでした: $message"
    exit 1
fi

if [ ! -f ".env" ]; then
    echo "[エラー] .envファイルが見つかりません。"
    exit 1
fi

# .env 読み込み
export $(grep -v '^#' .env | xargs)
DISCORD_WEBHOOK=$(echo "$DISCORD_WEBHOOK" | tr -d '\r\n' | xargs)
echo "[DEBUG] TRIMMED DISCORD_WEBHOOK: \"$DISCORD_WEBHOOK\""

if [ "$service" = "discord" ]; then
    JSON_FILE="response.json"
    notion_url="https://api.notion.com/v1/databases/$NOTION_DATABASE_ID/query"

    # Notion API リクエスト
    curl -s -X POST \
      -H "Authorization: Bearer $NOTION_API_KEY" \
      -H "Notion-Version: 2022-06-28" \
      -H "Content-Type: application/json" \
      -d "{\"filter\": {\"property\": \"ID\",\"number\": {\"equals\": $number}}}" \
      "$notion_url" -o "$JSON_FILE"

    if [ ! -s "$JSON_FILE" ]; then
        echo "[エラー] Notion API の応答が空です"
        exit 1
    fi

    result_count=$(jq '.results | length' "$JSON_FILE")
    if [ "$result_count" -eq 0 ]; then
        echo "[警告] 該当タスクが Notion に見つかりません (ID: $number)"
        rm -f "$JSON_FILE"
        exit 1
    fi

    # 値抽出（安全に fallback あり）
    task_name=$(jq -r '.results[0].properties["タスク名"].title[0].plain_text // "（無題）"' "$JSON_FILE")
    assignee=$(jq -r '.results[0].properties["担当者"].people[0].name // "未割り当て"' "$JSON_FILE")
    avatar_url=$(jq -r '.results[0].properties["担当者"].people[0].avatar_url // "https://via.placeholder.com/100"' "$JSON_FILE")
    task_url=$(jq -r '.results[0].url // "https://www.notion.so"' "$JSON_FILE")

    timestamp=$(date "+%Y/%m/%d %H:%M")
    color=$((RANDOM % 16777216))

    # Discord用 JSON ペイロード構築
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

    echo "[DEBUG] Payload to send:"
    echo "$payload"

    curl -s -H "Content-Type: application/json" -X POST -d "$payload" "$DISCORD_WEBHOOK"

    rm -f "$JSON_FILE"
    echo "[情報] 一時ファイルを削除しました: $JSON_FILE"
fi