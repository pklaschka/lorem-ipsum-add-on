import { ToastQueue } from "@react-spectrum/toast";

let closeFunction = () => {};

export function success() {
	ToastQueue.positive("Placeholder text inserted.", {
		timeout: 2600,
	});
}

export function containsPointText() {
	closeFunction();
	closeFunction = ToastQueue.neutral(
		"Point text selected If your selected layer is a point text layer, the plugin cannot ascertain its height. Therefore, we will produce two words appropriate for links or buttons. To obtain additional words, please choose a text layer with a defined height.",
	);
}

export function noTextNodes() {
	ToastQueue.negative("No text nodes were selected.", {
		timeout: 3200,
	});
}
