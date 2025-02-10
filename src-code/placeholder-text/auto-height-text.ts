import { TextNode } from "express-document-sdk";
import {
	generatePlaceholderText,
	LoremIpsumOptions,
} from "./get-placeholder-text";

export function insertPlaceholderTextToAutoHeightTextNode(
	autoHeightTextNode: TextNode,
	loremIpsumOptions: LoremIpsumOptions,
): void {
	const oldHeight = autoHeightTextNode.boundsLocal.height;

	const isClipping = (n: number) => {
		autoHeightTextNode.fullContent.text = generatePlaceholderText(
			n,
			loremIpsumOptions,
		);
		return autoHeightTextNode.boundsLocal.height > oldHeight;
	};

	let upperBound = 2;
	let lowerBound = 0;
	while (!isClipping(upperBound)) {
		lowerBound = upperBound;
		upperBound *= 2;
	}

	autoHeightTextNode.fullContent.text = generatePlaceholderText(
		binaryLengthSearch(
			upperBound,
			lowerBound,
			isClipping,
		),
		loremIpsumOptions,
	);
}

/**
 * Performs a binary search for the number n that's closest to the clipping number without clipping.
 *
 * n must be between clippingNumber and notClippingNumber
 *
 * Runs in O(log n), where n=abs(clippingNumber-notClippingNumber)
 *
 * @param clippingNumber a number of which it is known that it clips
 * @param notClippingNumber a number of which it is known that it doesn't clip
 * @param isClipping callback for checking whether a number n clips
 * @returns number n that's closest to the clipping number without clipping.
 */
export function binaryLengthSearch(
	clippingNumber: number,
	notClippingNumber: number,
	isClipping: (n: number) => boolean,
): number {
	if (Math.abs(clippingNumber - notClippingNumber) < 2) {
		return notClippingNumber;
	}

	let half = Math.floor((clippingNumber + notClippingNumber) / 2);

	return isClipping(half)
		? binaryLengthSearch(half, notClippingNumber, isClipping)
		: binaryLengthSearch(clippingNumber, half, isClipping);
}
