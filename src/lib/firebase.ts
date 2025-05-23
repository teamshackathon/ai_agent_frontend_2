import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// サーバーサイドでの初期化を安全に行う
function createFirebaseApp() {
	if (typeof window === "undefined") {
		// サーバーサイドの場合
		// 環境変数が設定されているか確認
		if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
			console.error("Firebase configuration missing in server environment");
			// ダミーの設定を返して続行を許可
			return initializeApp({
				apiKey: "dummy-api-key",
				authDomain: "dummy-auth-domain",
				projectId: "dummy-project-id",
			});
		}
	}

	// 既に初期化されていれば、既存のappを返す
	if (getApps().length > 0) {
		return getApp();
	}

	// 初期化
	return initializeApp(firebaseConfig);
}

// Firebase Auth インスタンスを取得
export function getFirebaseAuth() {
	const app = createFirebaseApp();
	return getAuth(app);
}
