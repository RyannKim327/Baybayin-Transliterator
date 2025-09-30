import { BAYBAYIN_CHARACRERS, NORMALIZED_RULES } from "./variables";

export function normalizeText(input: string) {
	let text = input.toLowerCase();
	for (let [pattern, replacement] of NORMALIZED_RULES) {
		text = text.replace(pattern, replacement);
	}
	for (let [punc, code] of BAYBAYIN_CHARACRERS.punctuations) {
		text = text.replace(
			new RegExp(`\\${punc}`, "g"),
			String.fromCharCode(code),
		);
	}
	return text;
}

export function toBaybayin(text: string) {
	let result = "";
	for (let i = 0; i < text.length; i++) {
		const char = text[i];

		if (char === "n" && text[i + 1] === "g") {
			result += String.fromCharCode(BAYBAYIN_CHARACRERS.ng);
			i++;
			continue;
		}

		if (BAYBAYIN_CHARACRERS.consonants.has(char)) {
			result += String.fromCharCode(BAYBAYIN_CHARACRERS.consonants.get(char));

			const next = text[i + 1];
			if (BAYBAYIN_CHARACRERS.vowelDiacritics.has(next)) {
				const diacritic = BAYBAYIN_CHARACRERS.vowelDiacritics.get(next);
				if (diacritic) result += String.fromCharCode(diacritic);
				i++;
			} else {
				result += String.fromCharCode(
					BAYBAYIN_CHARACRERS.vowelDiacritics.get("default"),
				);
			}
			continue;
		}

		if (BAYBAYIN_CHARACRERS.vowels.has(char)) {
			result += String.fromCharCode(BAYBAYIN_CHARACRERS.vowels.get(char));
			continue;
		}

		result += char;
	}
	return result;
}
