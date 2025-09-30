/**
 * Basic Usage Examples for Baybayin Transliterator
 * 
 * This file demonstrates the fundamental usage patterns of the
 * Baybayin Transliterator package.
 */

import baybay from '../../src/index';

// Example 1: Simple word transliteration
console.log('=== Example 1: Simple Words ===');
const simpleWords = ['kamusta', 'mahal', 'salamat', 'oo', 'hindi'];

simpleWords.forEach(word => {
    const result = baybay(word);
    console.log(`${result.original} → ${result.baybain}`);
});

// Example 2: Sentences with punctuation
console.log('\n=== Example 2: Sentences ===');
const sentences = [
    'Kamusta ka?',
    'Mahal kita!',
    'Salamat sa lahat.',
    'Ang ganda ng umaga, hindi ba?'
];

sentences.forEach(sentence => {
    const result = baybay(sentence);
    console.log(`Original: ${result.original}`);
    console.log(`Baybayin: ${result.baybain}`);
    console.log('---');
});

// Example 3: Handling different character types
console.log('\n=== Example 3: Character Types ===');
const mixedText = [
    'computer',      // English loanword
    'mga tao',       // Plural marker
    'ng bayan',      // ng digraph
    'Filipino 2024', // Mixed with numbers
    'Hello, world!'  // English with punctuation
];

mixedText.forEach(text => {
    const result = baybay(text);
    console.log(`${result.original} → ${result.baybain}`);
});

// Example 4: Multiline text
console.log('\n=== Example 4: Multiline Text ===');
const poem = `Ang aming bayan
Ay napakaganda
Salamat sa Diyos
Sa lahat ng biyaya`;

const poemResult = baybay(poem);
console.log('Original poem:');
console.log(poemResult.original);
console.log('\nBaybayin translation:');
console.log(poemResult.baybain);

// Example 5: Error handling and edge cases
console.log('\n=== Example 5: Edge Cases ===');
const edgeCases = [
    '',              // Empty string
    '   ',           // Whitespace only
    '123',           // Numbers only
    '@#$%',          // Special characters only
    'a',             // Single character
    'ng'             // Special digraph
];

edgeCases.forEach(text => {
    const result = baybay(text);
    console.log(`"${result.original}" → "${result.baybain}"`);
});

// Example 6: Demonstrating normalization
console.log('\n=== Example 6: Normalization Examples ===');
const normalizationExamples = [
    'computer',      // c→k, u→o, r→d
    'Filipino',      // f→p, i→e
    'victory',       // v→b, c→k, r→d
    'quiz',          // q→k, z→s
    'jeep',          // j→dy
    'mga bahay'      // mga→manga
];

normalizationExamples.forEach(text => {
    const result = baybay(text);
    console.log(`${result.original} → ${result.baybain}`);
    console.log(`  (shows normalization effects)`);
});

// Example 7: Performance demonstration
console.log('\n=== Example 7: Performance Test ===');
const longText = 'Kamusta ka aking mahal na kaibigan. '.repeat(100);
const startTime = performance.now();
const longResult = baybay(longText);
const endTime = performance.now();

console.log(`Processed ${longText.length} characters in ${(endTime - startTime).toFixed(2)}ms`);
console.log(`Rate: ${(longText.length / (endTime - startTime)).toFixed(0)} characters/ms`);
console.log(`First 100 characters of result: ${longResult.baybain.substring(0, 100)}...`);