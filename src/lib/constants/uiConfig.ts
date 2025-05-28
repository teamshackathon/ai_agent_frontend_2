import { Loader, Send } from "lucide-react";
import type { CSSProperties } from "react";

const scrollbarStyle = {
	"&::-webkit-scrollbar": {
		width: "8px",
	},
	"&::-webkit-scrollbar-thumb": {
		background: "gray.400",
		borderRadius: "8px",
	},
	"&::-webkit-scrollbar-track": {
		background: "transparent",
	},
};

export const UI_CONFIG = {
	messageArea: {
		containerStyle: {
			w: "full",
			flexGrow: 1,
			fontSize: "md",
			lineHeight: 1.2,
			pt: 0,
			pb: 0,
			pr: 0.5,
			pl: 3,
			overflowY: "visible" as const,
		},
		scroll: {
			scrollbarGutter: "stable",
			overflowY: "auto",
			...scrollbarStyle,
		},
		textareaStyle: {
			width: "100%",
			resize: "none" as CSSProperties["resize"],
			border: "none",
			outline: "none",
			background: "transparent",
			font: "inherit",
			lineHeight: "1.2",
		} satisfies CSSProperties,
		autosizeProps: {
			minRows: 1,
			maxRows: 6.5,
		},
		text: {
			placeholder: "メッセージ入力(ctrl + Enterで送信)",
		},
	},

	sendButton: {
		icon: {
			component: Send,
			style: { boxSize: 4, color: "inherit" },
		},
		load: {
			component: Loader,
			style: {
				boxSize: 4,
				animation: "spin 1s linear infinite",
			},
		},
		button: {
			w: 10,
			h: 10,
			borderRadius: "full",
			bg: "blue.500",
			color: "gray.100",
			_hover: {
				bg: "blue.600",
				color: "gray.50",
			},
			zIndex: 1,
			variant: "ghost" as const,
		},
		accessibility: {
			label: "メッセージ送信",
		},
	},

	chatInput: {
		style: {
			overflow: "visible" as const,
			borderRadius: "2xl",
			px: 2,
			py: 2,
			w: "full",
			boxShadow: "md",
		},
	},

	chatWindow: {
		outer: {
			display: "flex" as const,
			flexDirection: "column" as const,
			height: "100%",
		},
		input: {
			px: 4,
			pb: 2,
		},
		output: {
			flex: 1,
			display: "flex" as const,
			flexDirection: "column" as const,
			overflowY: "auto" as const,
			justifyContent: "flex-end" as const,
			pr: 2,
			pl: 4,
			sx: { ...scrollbarStyle },
		},
		Loading: {
			flex: {
				position: "fixed" as const,
				inset: 0,
				justify: "center" as const,
				align: "center" as const,
				bg: "white",
				zIndex: 100,
			},
			spinner: {
				size: "xl",
				thickness: "4px",
				emptyColor: "gray.200",
				color: "blue.500",
				speed: "0.8s",
			},
		},
	},

	chatOutput: {
		style: {
			height: "100%",
			position: "relative" as const,
			display: "flex" as const,
			flexDirection: "column" as const,
			overflowY: "auto" as const,
			pr: 2,
			sx: { ...scrollbarStyle },
		},
		vStack: {
			spacing: 1,
			width: "100%",
			flex: 1,
			justify: "flex-end",
		},
	},

	message: {
		style: {
			px: 4,
			py: 1,
			borderRadius: "3xl",
			maxWidth: "70%",
			boxShadow: "md",
		},
		user: {
			adjust: {
				width: "full" as const,
				justify: "flex-end" as const,
				my: 1,
			},
			color: { bg: "blue.200" },
			font: { color: "black", lineHeight: 1.3 },
		},
		assistant: {
			adjust: {
				width: "full" as const,
				justify: "flex-start" as const,
				my: 1,
			},
			color: { bg: "green.200" },
			font: { color: "black", lineHeight: 1.3 },
		},
		system: {
			adjust: {
				width: "full" as const,
				justify: "center" as const,
				my: 1,
			},
			color: { bg: "yellow.200" },
			font: { color: "black", lineHeight: 1.3 },
		},
	},
};
