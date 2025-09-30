# Baybayin Transliterator API Documentation

## Overview

The Baybayin Transliterator provides a simple yet powerful API for converting Latin text to Baybayin script. This document covers all available functions, types, and usage patterns.

## Installation

```bash
npm install baybayin-transliterator
```

## Quick Start

```typescript
import baybay from 'baybayin-transliterator';

const result = baybay("Kamusta ka");
console.log(result.baybain); // Output: ᜃᜋᜓᜐ᜔ᜆ ᜃ
```

## Main API

### `baybay(text: string)`

The primary function for transliterating Latin text to Baybayin script.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | `string` | Yes | The Latin text to convert to Baybayin |

#### Returns

```typescript
{
  original: string;  // The original input text
  baybain: string;   // The transliterated Baybayin text
}
```

#### Examples

**Basic Usage:**
```typescript
import baybay from 'baybayin-transliterator';

const result = baybay("hello");
console.log(result);
// Output: { original: "hello", baybain: "ᜑᜒᜎ᜔ᜎᜓ" }
```

**Multiple Words:**
```typescript
const result = baybay("Kamusta ka aking kaibigan");
console.log(result.baybain);
// Output: ᜃᜋᜓᜐ᜔ᜆ ᜃ ᜀᜃᜒᜅ᜔ ᜃᜀᜒᜊᜒᜄᜈ᜔
```

**With Punctuation:**
```typescript
const result = baybay("Kumusta ka? Mabuti naman!");
console.log(result.baybain);
// Output: ᜃᜓᜋᜓᜐ᜔ᜆ ᜃ᜶ ᜋᜊᜓᜆᜒ ᜈᜋᜈ᜔᜶
```

**Multiline Text:**
```typescript
const text = `Kamusta ka aking mahal
Sana at nasa mabuti ka.`;
const result = baybay(text);
console.log(result.baybain);
// Output: ᜃᜋᜓᜐ᜔ᜆ ᜃ ᜀᜃᜒᜅ᜔ ᜋᜑᜎ᜔
//         ᜐᜈ ᜀᜆ᜔ ᜈᜐ ᜋᜊᜓᜆᜒ ᜃ᜵
```

## Internal Functions

While these functions are not exported, understanding them helps in contributing to the project.

### `normalizeText(input: string): string`

Applies phonetic normalization rules to prepare text for Baybayin conversion.

#### Normalization Rules

| Original | Normalized | Reason |
|----------|------------|---------|
| `i` | `e` | Baybayin doesn't distinguish i/e |
| `u` | `o` | Baybayin doesn't distinguish u/o |
| `r` | `d` | Historical phonetic similarity |
| `f` | `p` | No F sound in traditional Filipino |
| `c`, `q` | `k` | Phonetic equivalence |
| `v` | `b` | No V sound in traditional Filipino |
| `x`, `z` | `s` | Phonetic approximation |
| `j` | `dy` | Closest phonetic equivalent |
| `mga` | `manga` | Proper pronunciation |

#### Examples

```typescript
// Internal function - not directly accessible
normalizeText("Filipino"); // Returns: "pelepeno"
normalizeText("computer"); // Returns: "kompyoted"
normalizeText("mga tao"); // Returns: "manga tao"
```

### `toBaybayin(text: string): string`

Converts normalized text to Baybayin Unicode characters.

#### Character Processing Logic

1. **Digraph Detection**: Checks for `ng` combinations first
2. **Consonant Processing**: Adds appropriate vowel diacritics
3. **Vowel Processing**: Direct mapping for standalone vowels
4. **Fallback**: Preserves unrecognized characters

## Type Definitions

### `BAYBAYIN_LIST`

```typescript
type BAYBAYIN_LIST = Map<string, number | null>;
```

A Map structure for storing character-to-Unicode mappings.

### `BAYBAYIN`

```typescript
type BAYBAYIN = Record<string, number | BAYBAYIN_LIST>;
```

The main structure for organizing Baybayin character mappings.

### `NOMALIZED_TEXT`

```typescript
type NOMALIZED_TEXT = [RegExp, string];
```

A tuple representing a normalization rule (pattern and replacement).

## Character Mappings

### Consonants

| Latin | Baybayin | Unicode | Code Point |
|-------|----------|---------|------------|
| b | ᜊ | U+170A | 5898 |
| k | ᜃ | U+1703 | 5891 |
| d | ᜇ | U+1707 | 5895 |
| g | ᜄ | U+1704 | 5892 |
| h | ᜑ | U+1711 | 5905 |
| l | ᜎ | U+170E | 5902 |
| m | ᜋ | U+170B | 5899 |
| n | ᜈ | U+1708 | 5896 |
| p | ᜉ | U+1709 | 5897 |
| s | ᜐ | U+1710 | 5904 |
| t | ᜆ | U+1706 | 5894 |
| w | ᜏ | U+170F | 5903 |
| y | ᜌ | U+170C | 5900 |
| ng | ᜅ | U+1705 | 5893 |

### Vowels

| Latin | Baybayin | Unicode | Code Point |
|-------|----------|---------|------------|
| a | ᜀ | U+1700 | 5888 |
| e | ᜁ | U+1701 | 5889 |
| o | ᜂ | U+1702 | 5890 |

### Vowel Diacritics

| Vowel | Diacritic | Unicode | Code Point |
|-------|-----------|---------|------------|
| e | ᜒ | U+1712 | 5906 |
| o | ᜓ | U+1713 | 5907 |
| a | (none) | - | null |
| (default) | ᜔ | U+1714 | 5908 |

### Punctuation

| Latin | Baybayin | Unicode | Code Point |
|-------|----------|---------|------------|
| . | ᜵ | U+1735 | 5941 |
| ? | ᜶ | U+1736 | 5942 |
| ! | ᜶ | U+1736 | 5942 |
| , | ᜵ | U+1735 | 5941 |

## Usage Patterns

### Error Handling

The library is designed to be fault-tolerant:

```typescript
// Handles empty strings
const empty = baybay("");
console.log(empty); // { original: "", baybain: "" }

// Preserves unknown characters
const mixed = baybay("Hello 123 @#$");
console.log(mixed.baybain); // "ᜑᜒᜎ᜔ᜎᜓ 123 @#$"

// Handles null/undefined gracefully (will throw TypeError)
try {
  baybay(null);
} catch (error) {
  console.log("Input must be a string");
}
```

### Performance Considerations

```typescript
// Efficient for normal text lengths
const short = baybay("kamusta"); // ~1ms

// Still efficient for longer texts
const long = baybay("A".repeat(10000)); // ~10ms

// For very large texts, consider chunking
function processLargeText(text: string, chunkSize = 1000) {
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    const chunk = text.slice(i, i + chunkSize);
    chunks.push(baybay(chunk).baybain);
  }
  return chunks.join('');
}
```

### Integration Examples

#### Express.js API

```typescript
import express from 'express';
import baybay from 'baybayin-transliterator';

const app = express();
app.use(express.json());

app.post('/transliterate', (req, res) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    const result = baybay(text);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Transliteration failed' });
  }
});
```

#### React Component

```typescript
import React, { useState } from 'react';
import baybay from 'baybayin-transliterator';

function BaybayinTranslator() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleTranslate = () => {
    const result = baybay(input);
    setOutput(result.baybain);
  };

  return (
    <div>
      <textarea 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to transliterate"
      />
      <button onClick={handleTranslate}>Translate</button>
      <div style={{ fontFamily: 'Baybayin font' }}>
        {output}
      </div>
    </div>
  );
}
```

#### CLI Tool

```typescript
#!/usr/bin/env node
import baybay from 'baybayin-transliterator';

const text = process.argv[2];
if (!text) {
  console.log('Usage: baybayin-cli "text to translate"');
  process.exit(1);
}

const result = baybay(text);
console.log(`Original: ${result.original}`);
console.log(`Baybayin: ${result.baybain}`);
```

## Limitations

### Current Limitations

1. **One-way conversion**: Only Latin to Baybayin (reverse not implemented)
2. **Limited punctuation**: Only basic punctuation marks supported
3. **No tone markers**: Doesn't handle stress or tone indicators
4. **Modern loanwords**: May not handle recent foreign borrowings accurately

### Font Requirements

To display Baybayin characters properly, ensure:

1. **System fonts**: Install Baybayin-compatible fonts
2. **Web fonts**: Use web fonts for browser applications
3. **Fallback fonts**: Provide fallback options for unsupported systems

```css
/* CSS example for web applications */
.baybayin-text {
  font-family: 'Baybayin Modern', 'Noto Sans Tagalog', serif;
  font-size: 1.2em;
  line-height: 1.5;
}
```

## Troubleshooting

### Common Issues

**Issue**: Characters not displaying properly
```typescript
// Solution: Check font support
const result = baybay("test");
console.log(result.baybain.charCodeAt(0)); // Should return Unicode code point
```

**Issue**: Unexpected normalization
```typescript
// Check what normalization is applied
const input = "computer";
// Internal: normalizeText(input) → "kompyoted"
const result = baybay(input);
console.log(result); // Shows both original and converted
```

**Issue**: Performance with large texts
```typescript
// Solution: Process in chunks
function efficientTransliteration(text: string) {
  if (text.length < 5000) {
    return baybay(text);
  }
  
  // Process in smaller chunks
  const chunks = text.match(/.{1,1000}/g) || [];
  const results = chunks.map(chunk => baybay(chunk).baybain);
  
  return {
    original: text,
    baybain: results.join('')
  };
}
```

## Version History

### v0.0.3 (Current)
- Improved algorithm implementation
- Better TypeScript support
- Enhanced normalization rules

### Future Versions
- Reverse transliteration (Baybayin to Latin)
- Regional variant support
- Performance optimizations
- Extended punctuation support

---

For more information, visit the [GitHub repository](https://github.com/RyannKim327/Baybayin-Transliterator) or contact the maintainer.