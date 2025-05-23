import { type FirebaseApp, getApps, initializeApp } from "firebase/app";
import {
	browserLocalPersistence,
	connectAuthEmulator,
	getAuth,
	setPersistence,
} from "firebase/auth";

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export function initFirebaseApp(): FirebaseApp {
	if (getApps().length > 0) {
		return getApps()[0];
	}

	return initializeApp(firebaseConfig);
}

export function getFirebaseAuth() {
	const app = initFirebaseApp();
	const auth = getAuth(app);

	if (process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === "true") {
		if (!auth.emulatorConfig) {
			connectAuthEmulator(auth, "http://localhost:9099");
		}
	}

	setPersistence(auth, browserLocalPersistence).catch((error) => {
		console.error("認証永続化エラー:", error);
	});

	return auth;
}
