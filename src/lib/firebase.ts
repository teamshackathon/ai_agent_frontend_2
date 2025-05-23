import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

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
	const auth = getAuth(app);

  // 開発環境の場合、エミュレーターに接続する
  if (
    typeof window !== "undefined" && 
    process.env.NODE_ENV === "development" && 
    process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === "true"
  ) {
    // エミュレーターのホストとポート (デフォルトは localhost:9099)
    const emulatorHost = process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST || "localhost";
    const emulatorPort = process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_PORT || "9099";
    
    try {
      connectAuthEmulator(auth, `http://${emulatorHost}:${emulatorPort}`, { disableWarnings: false });
      console.log(`Connected to Firebase Auth Emulator at ${emulatorHost}:${emulatorPort}`);
    } catch (error) {
      console.error("Failed to connect to Auth Emulator:", error);
    }
  }

  return auth;
}
