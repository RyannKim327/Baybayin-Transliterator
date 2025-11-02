import { normalizeText, toBaybayin } from "./functions";

export default function (text: string) {
  const original = text;
  const normalize = normalizeText(text);
  const baybayin = toBaybayin(normalize);

  return {
    original,
    baybayin,
  };
}
