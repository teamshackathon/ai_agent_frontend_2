// components/atoms/message/WordButton.tsx

import { Button } from "@chakra-ui/react";

type Props = {
  word: string;
  onSelect: (value: string) => void;
};

export default function WordSelect({ word, onSelect }: Props) {
  return (
    <Button size="sm" onClick={() => onSelect(word)}>
      {word}
    </Button>
  );
}
