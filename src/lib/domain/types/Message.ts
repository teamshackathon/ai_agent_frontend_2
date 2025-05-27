// lib/domain/types/message.ts

/**
 * チャット内で使用するロール定数。
 *
 * - USER: ユーザーからのメッセージ
 * - ASSISTANT: AIアシスタントの応答
 * - SYSTEM: システムからのメッセージ（初期化・設定など）
 */
export const ROLES = Object.freeze({
  USER: "USER",
  ASSISTANT: "ASSISTANT",
  SYSTEM: "SYSTEM",
} as const);

/**
 * チャットにおける発言者のロール（役割）を表す型。
 */
export type Role = (typeof ROLES)[keyof typeof ROLES];

export type ToolCall = {
  id: string; // ツールコールの一意なID
  type: "function"; // ツールコールのタイプ（関数呼び出し）
  function: {
    name: string; // 呼び出す関数の名前
    arguments: string; // JSON文字列
  };
};

/**
 * チャットメッセージを表す型。
 *
 * 各メッセージは送信者・内容・送信時間などの情報を含む。
 * Firestoreやログなどの保存対象としても使用可能。
 */
export type Message = {
  /** 一意なメッセージID（UUIDなど） */
  id: string;

  /** 発言者のロール（ユーザー/アシスタント/システム） */
  role: Role;

  /** メッセージ本文 */
  text?: string;

  /** ツールコールの情報（オプション） */
  toolCalls?: ToolCall[];

  /** 送信時刻 */
  timeStamp: Date;

  /** 添付ファイルのパスやURL（オプション） */
  attachment?: string;

  /** メッセージの状態（送信済み/送信中/エラーなど）（オプション）*/
  finishReason?: string;

  /** LLMからのレスポンスのトークン数（オプション）*/
  usage?: any;

  /** LLMからの元レスポンス全体を保持するフィールド（デバッグ/解析用・任意）*/
  rawResponse?: any;
};
