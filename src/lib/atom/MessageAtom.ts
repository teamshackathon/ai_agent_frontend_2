// lib/atom/MessageAtom.ts

import { atom } from "jotai";
import type { Message } from "../domain/MessageQuery";

export const messageListAtom = atom<Message[]>([]);
export const isSendingAtom = atom(false);
export const messageErrorAtom = atom<Error | null>(null);
