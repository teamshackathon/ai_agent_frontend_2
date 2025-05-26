// lib/constants/uiConfig.ts

import type { CSSProperties } from "react";
import { Send, Loader } from "lucide-react";
import { px } from "framer-motion";

export const UI_CONFIG = {
  messageArea: {
    containerStyle: {
      // autosize-textareaのコンテナスタイル
      w: "full", // 幅を100%に設定
      flexGrow: 1, // フレックスコンテナ内での成長を許可
      fontSize: "md", // フォントサイズ
      lineHeight: 1.2, // 行間のデフォルト値
      pt: 0, // 上の余白
      pb: 0, // 下の余白
      pr: 0.5, // 右の余白
      pl: 3, // 左の余白
      overflowY: "visible" as const, // スクロール可能にする, as constを使うことで、TypeScriptに定数として認識させる
    },
    scroll: {
      scrollbarGutter: "stable", // スクロールバー分のスペースを確保
      overflowY: "auto", // 縦方向のオーバーフローを自動にする
      "&::-webkit-scrollbar": {
        width: "8px",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "gray.400",
        borderRadius: "8px",
      },
    },
    textareaStyle: {
      // autosize-textareaのスタイル
      width: "100%", // 幅を100%に設定
      resize: "none" as CSSProperties["resize"], // リサイズ不可にする
      border: "none", // ボーダーをなしにする
      outline: "none", // アウトラインをなしにする
      background: "transparent", // 背景を透明にする
      font: "inherit", // フォントを親要素から継承
      lineHeight: "1.2", // ← stringで渡す
    } satisfies CSSProperties,
    autosizeProps: {
      // 何行まで自動で拡大するか
      minRows: 1,
      maxRows: 6.5,
    },
    text: {
      placeholder: "メッセージ入力(ctrl + Enterで送信)",
    },
  },

  sendButton: {
    icon: {
      component: Send,
      style: {
        boxSize: 4,
        color: "inherit",
      },
    },
    load: {
      component: Loader,
      style: {
        boxSize: 4,
        animation: "spin 1s linear infinite",
      },
    },
    button: {
      w: 10,
      h: 10,
      borderRadius: "full",
      bg: "blue.500", // 背景色
      color: "gray.100",
      _hover: {
        bg: "blue.600", // ホバー時の背景色
        color: "gray.50",
      },
      zIndex: 1,
      variant: "ghost" as const,
    },
    accessibility: {
      label: "メッセージ送信",
    },
  },

  chatInput: {
    style: {
      overflow: "visible" as const,
      borderRadius: "2xl",
      px: 2,
      py: 2,
      w: "full",
    },
  },

  chatWindow: {
    style: {
      w: "full",
      position: "fixed" as const,
      bottom: 0,
      left: 0,
      px: 4,
      py: 4,
      zIndex: 10,
      boxShadow: "md",
    },
  },
};
