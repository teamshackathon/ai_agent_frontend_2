import { Loader, Send } from "lucide-react";
import type { CSSProperties } from "react";

export const scrollbarStyle = {
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "gray.400",
    borderRadius: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
};

export const messageBox = {
  px: 4,
  py: 1,
  borderRadius: "3xl",
  maxWidth: "70%",
  boxShadow: "md",
};
