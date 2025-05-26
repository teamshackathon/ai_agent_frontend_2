// lib/constants/uiConfig.ts

import { Send, Loader } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SystemStyleObject } from "@chakra-ui/react";

export const UI_CONFIG = {
  messageArea: {
    style: {
      resize: "none" as const,
      fontSize: "md",
      p: 4, // 右に余白が必要であれば pr: 12 にするなど調整可能
      maxH: { base: "8rem", md: "12rem" },
      overflowY: "auto" as const,
      flexGrow: 1,
    } satisfies SystemStyleObject,
    text: {
      placeholder: "メッセージ入力(ctrl + Enterで送信)",
    },
  },

  sendButton: {
    icon: {
      component: Send,
      style: {
        boxSize: 4,
        color: "gray.500",
        _hover: { color: "gray.800" },
        _disabled: { opacity: 0.5, cursor: "not-allowed" },
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
      position: "absolute" as const,
      bottom: 2,
      right: 2,
      variant: "ghost" as const,
    },
    accessibility: {
      label: "メッセージ送信",
    },
  },
};
