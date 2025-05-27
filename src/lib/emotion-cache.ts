// lib/emotion-cache.ts
import createCache from "@emotion/cache";

export const emotionCache = createCache({
	key: "chakra",
	prepend: true,
});
