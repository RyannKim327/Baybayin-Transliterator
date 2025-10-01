const BAYBAYIN_CHARACTERS = {
    consonants: new Map([
        ["b", 5898],
        ["k", 5891],
        ["d", 5895],
        ["g", 5892],
        ["h", 5905],
        ["l", 5902],
        ["m", 5899],
        ["n", 5896],
        ["p", 5897],
        ["s", 5904],
        ["t", 5894],
        ["w", 5903],
        ["y", 5900],
    ]),
    ng: 5893,
    vowels: new Map([
        ["a", 5888],
        ["e", 5889],
        ["o", 5890],
    ]),
    vowelDiacritics: new Map([
        ["e", 5906],
        ["o", 5907],
        ["a", null],
        ["default", 5908],
    ]),
    punctuations: new Map([
        [".", 5942],
        ["?", 5942],
        ["!", 5942],
        [",", 5941],
    ]),
};
const NORMALIZED_RULES = [
    [/i/gi, "e"],
    [/u/gi, "o"],
    [/r/gi, "d"],
    [/mga/gi, "manga"],
    [/f/gi, "p"],
    [/c|q/gi, "k"],
    [/v/gi, "b"],
    [/x|z/gi, "s"],
    [/j/gi, "dy"],
    [/\bng\b/gi, " nang "],
];
export { BAYBAYIN_CHARACTERS, NORMALIZED_RULES };
//# sourceMappingURL=variables.js.map