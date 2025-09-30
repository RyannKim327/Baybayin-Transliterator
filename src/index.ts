import { normalizeText, toBaybayin } from "./functions";

export default function baybay(text: string) {
	const original = text;
	const normalize = normalizeText(text);
	const baybayin = toBaybayin(normalize);
	return {
		original,
		baybayin,
	};
}
