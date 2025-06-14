// lib/domain/MessageQuery.ts

import { createAxiosClient } from "../infrastructure/AxiosClient";

/**
 * チャット内で使用するロール定数。
 *
 * - USER: ユーザーからのメッセージ
 * - ASSISTANT: AIアシスタントの応答
 * - SYSTEM: システムからのメッセージ（初期化・設定など）
 */
export const ROLES = Object.freeze({
  USER: "user",
  ASSISTANT: "assistant",
  SYSTEM: "system",
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
  /** chat-id */
  id: string | null;

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
  usage?: Record<string, unknown>;

  /** LLMからの元レスポンス全体を保持するフィールド（デバッグ/解析用・任意）*/
  rawResponse?: unknown;
};

/**
 * メッセージを生成する関数。
 * @param text - メッセージ本文
 * @param role - 発言者のロール（ユーザー/アシスタント/システム）
 * @param options - その他の追加フィールド（rawResponseなど）
 * @returns 生成されたメッセージオブジェクト
 */
export function generateMessage(
  id: string | null,
  text: string,
  role: Role,
  options: Partial<Omit<Message, "id" | "text" | "role" | "timeStamp">> = {}
): Message {
  return {
    id: id ?? `temp-${Date.now()}`, // ← chat_idがnullのときは仮ID
    text,
    role,
    timeStamp: new Date(),
    ...options,
  };
}

type ChatMessage = {
  role: string;
  content: string;
};

type ChatInput = {
  role: string;
  response: string;
  history: ChatMessage[];
  model_name?: string | null;
  chat_id: string | null;
};

type ChatOutput = {
  role: string;
  response: string;
  chat_id: string;
};

export async function postMessage(message: Message): Promise<void> {
  const client = createAxiosClient();
  await client.post<Message, void>("/chat", message);
}

export async function fetchMessages(): Promise<Message[]> {
  const client = createAxiosClient();
  const response = await client.get<Message[]>("/chat");
  return response.data;
}

export async function sendMessage(message: Message, history: Message[]) {
  const client = createAxiosClient();

  const apiHistory: ChatMessage[] = history.map((msg) => ({
    role: msg.role,
    content: msg.text ?? "",
  }));

  const payload: ChatInput = {
    role: message.role,
    response: message.text ?? "",
    history: apiHistory,
    model_name: "gemini-pro",
    chat_id: message.id || null, // ← ""ではなくnullを送る
  };

  const response = await client.post<ChatInput, ChatOutput>("/chat", payload);

  console.log("response:", response);
  console.log("response.data:", response.data);

  return response.data;
}
