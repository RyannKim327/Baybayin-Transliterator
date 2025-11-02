import { BAYBAYIN_CHARACTERS, NORMALIZED_RULES } from "./variables";

export function normalizeText(input: string) {
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
  const puncRegex = new RegExp(
    `[${puncs.map((p) => `\\${p}`).join("")}]`,
    "gi",
  );
  text = text.replace(puncRegex, (match) =>
    String.fromCharCode(BAYBAYIN_CHARACTERS.punctuations.get(match)!),
  );
  return text;
}

export function toBaybayin(text: string) {
  let result: string[] = [];
  for (let i = 0; i < text.length; i++) {
    const char: string = text[i] ?? "";

    if (char === "n" && text[i + 1] === "g") {
      result.push(String.fromCharCode(BAYBAYIN_CHARACTERS.ng));
      i += 2;
      if (!BAYBAYIN_CHARACTERS.vowels.has(text[i] ?? "")) {
        const code: number =
          BAYBAYIN_CHARACTERS.vowelDiacritics.get("default") ?? 0;
        result.push(String.fromCharCode(code));
        result.push(" ");
      }
      continue;
    }

    if (BAYBAYIN_CHARACTERS.consonants.has(char)) {
      result.push(
        String.fromCharCode(BAYBAYIN_CHARACTERS.consonants.get(char)!),
      );

      const next: string = text[i + 1] ?? "";
      if (BAYBAYIN_CHARACTERS.vowelDiacritics.has(next)) {
        const diacritic = BAYBAYIN_CHARACTERS.vowelDiacritics.get(next);
        if (diacritic) result.push(String.fromCharCode(diacritic));
        i++;
      } else {
        const code: number =
          BAYBAYIN_CHARACTERS.vowelDiacritics.get("default") ?? 0;
        result.push(String.fromCharCode(code));
      }
      continue;
    }

    if (BAYBAYIN_CHARACTERS.vowels.has(char)) {
      const code: number = BAYBAYIN_CHARACTERS.vowels.get(char) ?? 0;
      result.push(String.fromCharCode(code));
      continue;
    }

    result.push(char);
  }
  return result.join("").trim();
}
