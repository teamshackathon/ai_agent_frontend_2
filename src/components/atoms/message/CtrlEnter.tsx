// components/atoms/message/CtrlEnter.tsx

import { useEffect, useRef } from "react";

type Props = {
  onSend: () => void;
  isSending: boolean;
};

/**
 * Ctrl(Cmd) + Enterを押したときにメッセージを送信するコンポーネント
 */
export default function CtrlEnter({ onSend, isSending }: Props) {
  // onSendをrefに保存しておく
  const onSendRef = useRef(onSend);
  const isSendingRef = useRef(isSending);

  // onSendが変更されたときにrefを更新
  useEffect(() => {
    onSendRef.current = onSend;
  }, [onSend]);

  // isSendingが変更されたときにrefを更新
  useEffect(() => {
    isSendingRef.current = isSending;
  }, [isSending]);

  // コンポーネントがマウントされたときにのみイベントリスナーを登録
  // Ctrl(Cmd) + Enterを押したときにonSendを呼び出す
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        if (!isSendingRef.current) {
          onSendRef.current();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return null;
}
