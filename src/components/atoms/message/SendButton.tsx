// components/atoms/message/SendButton.tsx

import { Button } from "@/components/ui/button";
import { UI_CONFIG } from "@/lib/constants/uiConfig";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type SendButtonProps = ComponentProps<"button"> & { isSending?: boolean };

/**
 * メッセージ送信ボタン
 *
 * `onClick`:`Function`
 *
 * その他、標準の `<button>` 属性を受け取る
 */
export default function SendButton({
  isSending,
  className,
  ...props
}: SendButtonProps) {
  const DefaultIcon = UI_CONFIG.sendButton.icon.component; // アイコンのコンポーネントを取得
  const LoadingIcon = UI_CONFIG.sendButton.load.component; // 送信中のアイコンを取得

  return (
    <Button
      type="button" // ボタンのタイプ
      size="icon" // アイコンサイズ(上書きされるが、指定なしができなそう)
      variant={UI_CONFIG.sendButton.button.variant} // カーソルを合わせたときに色が変わる
      aria-label={UI_CONFIG.sendButton.accessibility.label} // アクセシビリティ用のラベル
      className={cn(
        UI_CONFIG.sendButton.button.position, // 右下に配置
        UI_CONFIG.sendButton.button.size, // ボタンのサイズ
        UI_CONFIG.sendButton.icon.color, // 色
        UI_CONFIG.sendButton.icon.disabled, // 無効化時の色
        className // 上書き可能にしている
      )}
      {...props}
    >
      {isSending ? (
        <LoadingIcon className={UI_CONFIG.sendButton.load.animate} />
      ) : (
        <DefaultIcon className={UI_CONFIG.sendButton.icon.size} />
      )}
    </Button>
  );
}
