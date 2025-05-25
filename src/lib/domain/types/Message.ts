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

/**
 * チャットメッセージを表す型。
 *
 * 各メッセージは送信者・内容・送信時間などの情報を含む。
 * Firestoreやログなどの保存対象としても使用可能。
 */
export type Message = {
	/** 一意なメッセージID（UUIDなど） */
	id: string;

	/** メッセージ本文 */
	text: string;

	/** 発言者のロール（ユーザー/アシスタント/システム） */
	role: Role;

	/** 送信時刻 */
	timeStamp: Date;

	/** 添付ファイルのパスやURL（オプション） */
	attachment?: string;

	/**
	 * AIアシスタントによる関数呼び出しの要求情報（オプション）
	 * OpenAIのFunction Callingなどで使用。
	 */
	functionCall?: {
		/** 呼び出す関数名 */
		name: string;

		/** 関数に渡す引数オブジェクト */
		arguments: Record<string, any>;
	};

	/**
	 * LLMからの元レスポンス全体を保持するフィールド（デバッグ/解析用・任意）
	 */
	rawResponse?: any;
};
