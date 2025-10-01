export type BAYBAYIN_LIST = Map<string, number | null>;
// export type BAYBAYIN = Record<string, number | BAYBAYIN_LIST>;
export type NOMALIZED_TEXT = [RegExp, string];

export interface BAYBAYIN {
	consonants: BAYBAYIN_LIST;
	ng: number;
	vowels: BAYBAYIN_LIST;
	vowelDiacritics: BAYBAYIN_LIST;
	punctuations: BAYBAYIN_LIST;
}
