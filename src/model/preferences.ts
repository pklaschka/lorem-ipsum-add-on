import { create } from "zustand";
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import {
	DEFAULT_PLACEHOLDER_TEXT,
} from "../components/placeholder-text-picker";
import { z } from "zod";
import { ToastQueue } from "@react-spectrum/toast";

const PreferencesSchema = z.object({
	ready: z.boolean(),
	text: z.string(),
	punctuation: z.string(),
	includeLineBreaks: z.boolean(),
});

interface Methods {
	init: () => Promise<void>;
	set: (
		preferences: Partial<z.infer<typeof PreferencesSchema>>,
	) => Promise<void>;
	setText: (text: string) => Promise<void>;
	setPunctuation: (punctuation: string) => Promise<void>;
	setIncludeLineBreaks: (includeLineBreaks: boolean) => Promise<void>;
}

export const usePreferences = create<
	Methods & z.infer<typeof PreferencesSchema>
>()((
	set,
	get,
) => ({
	ready: false,
	text: "",
	punctuation: "",
	includeLineBreaks: false,

	init: async () => {
		await addOnUISdk.ready;
		const storage = addOnUISdk.instance.clientStorage;

		const preferences = await storage.getItem("preferences").catch((error) => {
			console.error("Failed to load preferences", error);
			ToastQueue.negative("Failed to load preferences.");
		});

		if (!preferences) {
			console.debug("No preferences found, setting defaults");
			set({
				ready: true,
				text: DEFAULT_PLACEHOLDER_TEXT,
			});

			return;
		}

		const parsedPreferences = PreferencesSchema.safeParse(preferences);

		if (parsedPreferences.success) {
			console.debug("Preferences loaded successfully");
			set({
				ready: true,
				...parsedPreferences.data,
			});

			return;
		}

		console.error("Failed to load preferences", parsedPreferences.error);
		set({
			ready: true,
			text: DEFAULT_PLACEHOLDER_TEXT,
		});
		ToastQueue.negative(
			"Failed to load preferences. Using default preferences instead.",
		);
	},
	set: async (preferences: Partial<z.infer<typeof PreferencesSchema>>) => {
		console.debug("Setting preferences", preferences);
		set(preferences);
		await addOnUISdk.instance.clientStorage.setItem(
			"preferences",
			JSON.parse(JSON.stringify(get())),
		).catch((error) => {
			console.error("Failed to save preferences", error);
			ToastQueue.negative("Failed to save preferences.");
		});
	},
	setText: (text: string) => {
		return get().set({ text });
	},
	setPunctuation: (punctuation: string) => {
		return get().set({ punctuation });
	},
	setIncludeLineBreaks: (includeLineBreaks: boolean) => {
		return get().set({ includeLineBreaks });
	},
}));
