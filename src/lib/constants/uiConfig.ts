// lib/constants/uiConfig.ts

import { Send, Loader } from "lucide-react";

const MESSAGE_LINEHEIGHT = 1.1; // 行間のデフォルト値

export const UI_CONFIG = {
  messageArea: {
    style: {
      resize: "none" as const, // サイズ変更不可
      fontSize: "md", // フォントサイズ
      lineHeight: MESSAGE_LINEHEIGHT, // 行間
      pt: 0, // 上の余白
      pb: 0, // 下の余白
      w: "full", // 幅を100%に
      minH: `${MESSAGE_LINEHEIGHT * 1}em`, // 最小の高さ
      maxH: `${MESSAGE_LINEHEIGHT * 4.5}em`, // 最大の高さ
      overflowY: "auto" as const,
      flexGrow: 1,
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
};
