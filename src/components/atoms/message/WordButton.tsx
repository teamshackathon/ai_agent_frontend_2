// components/atoms/message/WordButton.tsx

import { Button, Wrap, WrapItem } from "@chakra-ui/react";

type WordProps = {
  word: string;
  onSelect: (value: string) => void;
};

type ListProps = {
  words: string[];
  onSelect: (value: string) => void;
};

export function WordButton({ word, onSelect }: WordProps) {
  return (
    <Button size="sm" onClick={() => onSelect(word)}>
      {word}
    </Button>
  );
}

export default function WordButtonList({ words, onSelect }: ListProps) {
  return (
    <Wrap>
      {words.map((word, idx) => (
        <WrapItem key={idx}>
          <WordButton word={word} onSelect={onSelect} />
        </WrapItem>
      ))}
    </Wrap>
  );
}
