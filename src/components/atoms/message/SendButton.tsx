// components/atoms/message/SendButton.tsx

import { Button, Icon } from "@chakra-ui/react";
import { UI_CONFIG } from "@/lib/constants/uiConfig";
import type { ComponentProps } from "react";

type SendButtonProps = ComponentProps<typeof Button> & {
  isSending?: boolean;
};

export default function SendButton({ isSending, ...props }: SendButtonProps) {
  const { icon, load, button, accessibility } = UI_CONFIG.sendButton;

  const IconComponent = isSending ? load.component : icon.component;
  const iconStyle = isSending ? load.style : icon.style;

  return (
    <Button
      type="button"
      aria-label={accessibility.label}
      {...button}
      {...props}
    >
      <Icon as={IconComponent} {...iconStyle} />
    </Button>
  );
}
