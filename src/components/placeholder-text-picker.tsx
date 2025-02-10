import { Item, Picker } from "@adobe/react-spectrum";
import React from "react";

import placeholderTexts from "../placeholder-texts.json";

/**
 * Default placeholder text to use when the plugin is first opened.
 */
export const DEFAULT_PLACEHOLDER_TEXT =
	placeholderTexts["Lorem Ipsum (Latin, Standard)"];

/**
 * Available placeholder texts in the format `[label, value]`, where:
 * - `label` is the human-readable name of the placeholder text, and
 * - `value` is the actual placeholder text.
 */
const availablePlaceholderTexts = Object.entries(placeholderTexts);

/**
 * Picker component for selecting placeholder text.
 */
export function PlaceholderTextPicker({
	text,
	setText,
}: PlaceholderTextPickerProps) {
	return (
		<Picker
			label="Placeholder Text"
			width={"100%"}
			items={availablePlaceholderTexts}
			selectedKey={text}
			onSelectionChange={(key) => setText("" + key)}
		>
			{([label, value]) => <Item key={value}>{label}</Item>}
		</Picker>
	);
}

export interface PlaceholderTextPickerProps {
	text: string;
	setText: (text: string) => void;
}
