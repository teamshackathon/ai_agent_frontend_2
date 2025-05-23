// lib/constants/uiConfig.ts

import { Send, Loader } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const UI_CONFIG = {
  messageArea: {
    layout: {
      grow: "flex-1", // 横幅いっぱいに広がる
      scroll: "overflow-y-auto", // 複数行になったとき、スクロールする
      padding: "pr-12", // ボタン用に右側に余白を作る
    },
    size: {
      maxHeight: "max-h-32 md:max-h-48", // 複数行になったとき、ある程度の高さまで自動で広がる
    },
    text: {
      placeholder: "メッセージ入力(ctrl + Enterで送信)", // 未入力時のプレースホルダー
    },
  },
  sendButton: {
    icon: {
      component: Send as LucideIcon, // アイコンのコンポーネント
      size: "w-4 h-4", // アイコンのサイズ
      color: "text-muted-foreground hover:text-foreground", // 通常は薄灰色、カーソルを合わせたときは黒
      disabled: "disabled:opacity-50 disabled:cursor-not-allowed", // 無効化時の色
    },
    load: {
      component: Loader as LucideIcon, // 送信中のアイコン
      animate: "w-4 h-4 animate-spin", // アイコンのサイズ
    },
    button: {
      size: "w-10 h-10", // ボタン自体のサイズ
      position: "absolute bottom-2 right-2", // 右下に配置
      variant: "ghost" as const, // カーソルを合わせたときに色が変わる
    },
    accessibility: {
      label: "メッセージ送信",
    },
  },
};
