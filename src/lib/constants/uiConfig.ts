// lib/constants/uiConfig.ts

import type { CSSProperties } from "react";
import { Send, Loader } from "lucide-react";
import { color } from "framer-motion";
import { position } from "@chakra-ui/react";

export const UI_CONFIG = {
  // メッセージ入力エリアのスタイル設定
  messageArea: {
    // autosize-textareaのコンテナスタイル
    containerStyle: {
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
    // スクロールバーのスタイル
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
    // autosize-textareaのスタイル
    textareaStyle: {
      width: "100%", // 幅を100%に設定
      resize: "none" as CSSProperties["resize"], // リサイズ不可にする
      border: "none", // ボーダーをなしにする
      outline: "none", // アウトラインをなしにする
      background: "transparent", // 背景を透明にする
      font: "inherit", // フォントを親要素から継承
      lineHeight: "1.2", // ← stringで渡す
    } satisfies CSSProperties,
    // 何行まで自動で拡大するか
    autosizeProps: {
      minRows: 1,
      maxRows: 6.5,
    },
    // プレースホルダーのスタイル
    text: {
      placeholder: "メッセージ入力(ctrl + Enterで送信)",
    },
  },

  // メッセージ送信ボタンのスタイル設定
  sendButton: {
    // ボタンのアイコン
    icon: {
      component: Send,
      style: {
        boxSize: 4,
        color: "inherit",
      },
    },
    // ローディング中のアイコン
    load: {
      component: Loader,
      style: {
        boxSize: 4,
        animation: "spin 1s linear infinite",
      },
    },
    // ボタンのスタイル
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
      zIndex: 1, // 表示レイヤー
      variant: "ghost" as const, // ボタンのバリアント
    },
    // アクセシビリティのラベル
    accessibility: {
      label: "メッセージ送信",
    },
  },

  // チャット入力エリア全体のスタイル設定
  chatInput: {
    style: {
      overflow: "visible" as const, // はみだしてもスクロールバーを表示しない(他で表示するため)
      borderRadius: "2xl", // 角丸のサイズ
      px: 2, // 左右のパディング
      py: 2, // 上下のパディング
      w: "full", // 幅を100%に設定
      shadow: "md",
    },
  },

  // チャットウィンドウ全体のスタイル設定
  chatWindow: {
    outer: {
      position: "relative" as const,
      display: "flex" as const,
      flexDirection: "column" as const,
      height: "100%",
    },
    input: {
      px: 4,
      py: 2,
    },
    output: {
      flex: 1,
      display: "flex" as const,
      flexDirection: "column" as const,
      overflowY: "auto" as const,
      justifyContent: "flex-end" as const,
      px: 4,
      py: 4,
    },
    Loading: {
      flex: {
        position: "fixed" as const,
        inset: 0,
        justify: "center" as const,
        align: "center" as const,
        bg: "white",
        zIndex: 100,
      },
      spinner: {
        size: "xl",
        thickness: "4px",
        emptyColor: "gray.200",
        color: "blue.500",
        speed: "0.8s",
      },
    },
  },

  chatOutput: {
    style: {
      height: "100%",
      position: "relative" as const,
      display: "flex" as const,
      flexDirection: "column" as const,
    },
  },

  // メッセージログのスタイル設定
  message: {
    style: {
      px: 3,
      py: 1,
      borderRadius: "3xl",
      maxWidth: "70%",
      boxShadow: "md",
    },
    user: {
      adjust: {
        width: "full" as const,
        justify: "flex-end" as const,
        my: 1,
      },
      color: {
        bg: "blue.200",
      },
      fontColor: {
        color: "black",
      },
    },
    assistant: {
      adjust: {
        width: "full" as const,
        justify: "flex-start" as const,
        my: 1,
      },
      color: {
        bg: "green.200",
      },
      fontColor: {
        color: "black",
      },
    },
    system: {
      adjust: {
        width: "full" as const,
        justify: "center" as const,
        my: 1,
      },
      color: {
        bg: "yellow.200",
      },
      fontColor: {
        color: "black",
      },
    },
  },
};
