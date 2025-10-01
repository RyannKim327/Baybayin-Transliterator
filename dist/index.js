import { normalizeText, toBaybayin } from "./functions";
export default function baybay(text) {
    const original = text;
    const normalize = normalizeText(text);
    const baybayin = toBaybayin(normalize);
    return {
        original,
        baybayin,
    };
}
//# sourceMappingURL=index.js.map