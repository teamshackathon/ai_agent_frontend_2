// lib/domain/usecases/message/generateMessage.ts

import type { Message, Role } from "@/lib/domain/types/Message";

/**
 * メッセージを生成する関数。
 * @param text - メッセージ本文
 * @param role - 発言者のロール（ユーザー/アシスタント/システム）
 * @returns 生成されたメッセージオブジェクト
 */
export function generateMessage(text: string, role: Role): Message {
	return {
		id: crypto.randomUUID(),
		text,
		role,
		timeStamp: new Date(),
	};
}
