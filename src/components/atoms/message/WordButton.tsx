// components/atoms/message/WordButton.tsx

import { Button, Wrap, WrapItem } from "@chakra-ui/react";

type WordProps = {
	word: string;
	onSelect: (value: string) => void;
	disable?: boolean;
};

type ListProps = {
	words: string[];
	onSelect: (value: string) => void;
	disable?: boolean;
};

export function WordButton({ word, onSelect, disable }: WordProps) {
	return (
		<Button size="sm" onClick={() => onSelect(word)} isDisabled={disable}>
			{word}
		</Button>
	);
}

export default function WordButtonList({
	words,
	onSelect,
	disable,
}: ListProps) {
	return (
		<Wrap>
			{words.map((word) => (
				<WrapItem key={word}>
					<WordButton word={word} onSelect={onSelect} disable={disable} />
				</WrapItem>
			))}
		</Wrap>
	);
}
