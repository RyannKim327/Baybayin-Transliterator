import { BAYBAYIN_CHARACTERS, NORMALIZED_RULES } from "./variables";
export function normalizeText(input) {
    let text = input.toLowerCase();
    for (let [pattern, replacement] of NORMALIZED_RULES) {
        text = text.replace(pattern, replacement);
    }
    // for (let [punc, code] of BAYBAYIN_CHARACRERS.punctuations) {
    // 	text = text.replace(
    // 		new RegExp(`\\${punc}`, "g"),
    // 		String.fromCharCode(code),
    // 	);
    // }
    const puncs = [...BAYBAYIN_CHARACTERS.punctuations.keys()];
    const puncRegex = new RegExp(`[${puncs.map((p) => `\\${p}`).join("")}]`, "g");
    text = text.replace(puncRegex, (match) => String.fromCharCode(BAYBAYIN_CHARACTERS.punctuations.get(match)));
    return text;
}
export function toBaybayin(text) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === "n" && text[i + 1] === "g") {
            result += String.fromCharCode(BAYBAYIN_CHARACTERS.ng);
            i++;
            continue;
        }
        if (BAYBAYIN_CHARACTERS.consonants.has(char)) {
            result += String.fromCharCode(BAYBAYIN_CHARACTERS.consonants.get(char));
            const next = text[i + 1];
            if (BAYBAYIN_CHARACTERS.vowelDiacritics.has(next)) {
                const diacritic = BAYBAYIN_CHARACTERS.vowelDiacritics.get(next);
                if (diacritic)
                    result += String.fromCharCode(diacritic);
                i++;
                // } else {
                // 	result += String.fromCharCode(
                // 		BAYBAYIN_CHARACRERS.vowelDiacritics.get("default"),
                // 	);
            }
            continue;
        }
        if (BAYBAYIN_CHARACTERS.vowels.has(char)) {
            result += String.fromCharCode(BAYBAYIN_CHARACTERS.vowels.get(char));
            continue;
        }
        result += char;
    }
    return result;
}
//# sourceMappingURL=functions.js.map