/**
 * The available placeholder texts
 */
// import { LoremIpsumOptions } from '../model/lorem-ipsum-options';

export interface LoremIpsumOptions {
	/**
	 * The raw placeholder text
	 */
	text: string;

	/**
	 * Include line breaks in the placeholder text?
	 */
	includeLineBreaks: boolean;

	/**
	 * The punctuation to add at the end of the placeholder text verbatim
	 * (e.g. '.', '!', '?', '')
	 */
	punctuation: string;
}

/**
 * Generates placeholder text
 * @param length text length in words
 * @return placeholder text
 */
export function generatePlaceholderText(
	length: number,
	{text, includeLineBreaks, punctuation}: LoremIpsumOptions
) {
	const strReturn = trimToNWords(text, length, includeLineBreaks);
	console.log({strReturn, includeLineBreaks})
	if (/[.?!,;:\-–]$/.test(strReturn)) return strReturn.slice(0, -1); // Remove punctuation at the end

	return strReturn + punctuation;
}

/**
 * Trims a string to n words.
 * @param strText the source string
 * @param n Number of words
 * @param includeLineBreaks
 * @return the trimmed string
 */
function trimToNWords(strText: string, n: number, includeLineBreaks: boolean) {
	// Ensure the text is long enough:
	while (strText.split(' ').length < n) {
		strText = includeLineBreaks
			? `${strText}\n${strText}`
			: `${strText} ${strText}`;
	}

	return strText.split(' ').slice(0, n).join(' ').trim();
}