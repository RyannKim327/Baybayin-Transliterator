# Baybayin Transliterator Examples

This directory contains practical examples demonstrating how to use the Baybayin Transliterator package in various scenarios.

## 📁 Example Files

### 1. [basic-usage.ts](basic-usage.ts)
Demonstrates fundamental usage patterns including:
- Simple word transliteration
- Sentence processing with punctuation
- Handling different character types
- Multiline text processing
- Error handling and edge cases
- Normalization examples
- Performance testing

**Run with:**
```bash
npx tsx docs/examples/basic-usage.ts
```

### 2. [web-integration.html](web-integration.html)
A complete web application example featuring:
- Interactive text input and translation
- Real-time character counting
- Copy-to-clipboard functionality
- Example phrases for quick testing
- Responsive design for mobile devices
- Error handling and user feedback

**Open in browser:**
```bash
# Serve the file with a local server
python -m http.server 8000
# Then open http://localhost:8000/docs/examples/web-integration.html
```

### 3. [cli-tool.ts](cli-tool.ts)
A comprehensive command-line interface example with:
- Multiple input methods (direct text, file, interactive)
- Output options (console, file)
- Statistics and performance metrics
- Colored terminal output
- Interactive mode with commands
- Error handling and help system

**Run with:**
```bash
# Direct text translation
npx tsx docs/examples/cli-tool.ts "Kamusta ka?"

# File processing
npx tsx docs/examples/cli-tool.ts --file input.txt

# Interactive mode
npx tsx docs/examples/cli-tool.ts --interactive

# Show help
npx tsx docs/examples/cli-tool.ts --help
```

## 🚀 Quick Start Examples

### Basic Translation
```typescript
import baybay from 'baybayin-transliterator';

const result = baybay("Kamusta ka?");
console.log(result.baybain); // ᜃᜋᜓᜐ᜔ᜆ ᜃ᜶
```

### Express.js API Endpoint
```typescript
import express from 'express';
import baybay from 'baybayin-transliterator';

const app = express();
app.use(express.json());

app.post('/translate', (req, res) => {
    const { text } = req.body;
    const result = baybay(text);
    res.json(result);
});

app.listen(3000);
```

### React Component
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
                placeholder="Enter text to translate"
            />
            <button onClick={handleTranslate}>Translate</button>
            <div style={{ fontFamily: 'Noto Sans Tagalog' }}>
                {output}
            </div>
        </div>
    );
}
```

### Vue.js Component
```vue
<template>
    <div class="baybayin-translator">
        <textarea 
            v-model="inputText"
            placeholder="Enter text to translate"
            @input="translate"
        />
        <div class="output" :style="{ fontFamily: 'Noto Sans Tagalog' }">
            {{ outputText }}
        </div>
    </div>
</template>

<script>
import baybay from 'baybayin-transliterator';

export default {
    data() {
        return {
            inputText: '',
            outputText: ''
        };
    },
    methods: {
        translate() {
            if (this.inputText) {
                const result = baybay(this.inputText);
                this.outputText = result.baybain;
            } else {
                this.outputText = '';
            }
        }
    }
};
</script>
```

## 🔧 Integration Patterns

### 1. Batch Processing
```typescript
import baybay from 'baybayin-transliterator';

function processBatch(texts: string[]) {
    return texts.map(text => {
        const result = baybay(text);
        return {
            original: result.original,
            translated: result.baybain,
            timestamp: new Date().toISOString()
        };
    });
}

const texts = ["Kamusta", "Salamat", "Mahal kita"];
const results = processBatch(texts);
console.log(results);
```

### 2. Stream Processing
```typescript
import { Transform } from 'stream';
import baybay from 'baybayin-transliterator';

class BaybayinTransform extends Transform {
    constructor() {
        super({ objectMode: true });
    }

    _transform(chunk: string, encoding: string, callback: Function) {
        try {
            const result = baybay(chunk.toString());
            this.push(result.baybain);
            callback();
        } catch (error) {
            callback(error);
        }
    }
}

// Usage
const transformer = new BaybayinTransform();
process.stdin.pipe(transformer).pipe(process.stdout);
```

### 3. Caching for Performance
```typescript
import baybay from 'baybayin-transliterator';

class CachedTransliterator {
    private cache = new Map<string, string>();

    translate(text: string): string {
        if (this.cache.has(text)) {
            return this.cache.get(text)!;
        }

        const result = baybay(text);
        this.cache.set(text, result.baybain);
        
        // Limit cache size
        if (this.cache.size > 1000) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }

        return result.baybain;
    }

    clearCache(): void {
        this.cache.clear();
    }
}

const translator = new CachedTransliterator();
console.log(translator.translate("Kamusta")); // Computed
console.log(translator.translate("Kamusta")); // From cache
```

## 🎨 Styling Baybayin Text

### CSS for Web Applications
```css
.baybayin-text {
    font-family: 'Noto Sans Tagalog', 'Baybayin Modern', serif;
    font-size: 1.5em;
    line-height: 1.6;
    letter-spacing: 0.05em;
    color: #2c3e50;
}

.baybayin-display {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 20px;
    border-radius: 10px;
    border-left: 4px solid #3498db;
    margin: 20px 0;
}

.baybayin-large {
    font-size: 2.5em;
    text-align: center;
    margin: 30px 0;
}

/* Responsive design */
@media (max-width: 768px) {
    .baybayin-text {
        font-size: 1.2em;
    }
    
    .baybayin-large {
        font-size: 2em;
    }
}
```

### Font Loading
```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Tagalog&display=swap" rel="stylesheet">

<!-- Or local font -->
<style>
@font-face {
    font-family: 'Baybayin Modern';
    src: url('./fonts/baybayin-modern.woff2') format('woff2'),
         url('./fonts/baybayin-modern.woff') format('woff');
    font-display: swap;
}
</style>
```

## 📱 Mobile Integration

### React Native Example
```typescript
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import baybay from 'baybayin-transliterator';

export default function BaybayinApp() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const translate = () => {
        const result = baybay(input);
        setOutput(result.baybain);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={input}
                onChangeText={setInput}
                placeholder="Enter text to translate"
                multiline
            />
            <TouchableOpacity style={styles.button} onPress={translate}>
                <Text style={styles.buttonText}>Translate</Text>
            </TouchableOpacity>
            <Text style={styles.output}>{output}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15,
        borderRadius: 8,
        fontSize: 16,
        backgroundColor: 'white',
        minHeight: 100,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 8,
        marginVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    output: {
        fontSize: 24,
        fontFamily: 'NotoSansTagalog', // Make sure font is installed
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        minHeight: 100,
    },
});
```

## 🧪 Testing Examples

### Unit Tests
```typescript
import baybay from 'baybayin-transliterator';

describe('Baybayin Transliterator', () => {
    test('basic transliteration', () => {
        const result = baybay('kamusta');
        expect(result.original).toBe('kamusta');
        expect(result.baybain).toBe('ᜃᜋᜓᜐ᜔ᜆ');
    });

    test('handles punctuation', () => {
        const result = baybay('Hello!');
        expect(result.baybain).toContain('᜶');
    });

    test('handles empty string', () => {
        const result = baybay('');
        expect(result.original).toBe('');
        expect(result.baybain).toBe('');
    });

    test('preserves unknown characters', () => {
        const result = baybay('test 123');
        expect(result.baybain).toContain('123');
    });
});
```

### Performance Tests
```typescript
import baybay from 'baybayin-transliterator';

describe('Performance Tests', () => {
    test('handles large text efficiently', () => {
        const largeText = 'Kamusta ka aking kaibigan. '.repeat(1000);
        
        const start = performance.now();
        const result = baybay(largeText);
        const end = performance.now();
        
        expect(end - start).toBeLessThan(100); // Should complete in <100ms
        expect(result.baybain.length).toBeGreaterThan(0);
    });

    test('consistent performance', () => {
        const text = 'Consistent performance test';
        const times: number[] = [];
        
        for (let i = 0; i < 100; i++) {
            const start = performance.now();
            baybay(text);
            const end = performance.now();
            times.push(end - start);
        }
        
        const avgTime = times.reduce((a, b) => a + b) / times.length;
        const maxTime = Math.max(...times);
        
        expect(avgTime).toBeLessThan(5); // Average should be <5ms
        expect(maxTime).toBeLessThan(20); // Max should be <20ms
    });
});
```

## 🔍 Debugging and Troubleshooting

### Debug Helper Functions
```typescript
import baybay from 'baybayin-transliterator';

// Character analysis
function analyzeText(text: string) {
    const result = baybay(text);
    
    console.log('=== Text Analysis ===');
    console.log(`Original: "${result.original}"`);
    console.log(`Baybayin: "${result.baybain}"`);
    console.log('\nCharacter breakdown:');
    
    for (let i = 0; i < result.baybain.length; i++) {
        const char = result.baybain[i];
        const code = char.charCodeAt(0);
        console.log(`${char} -> U+${code.toString(16).toUpperCase().padStart(4, '0')} (${code})`);
    }
}

// Performance profiling
function profileTranslation(text: string, iterations = 1000) {
    const times: number[] = [];
    
    for (let i = 0; i < iterations; i++) {
        const start = performance.now();
        baybay(text);
        const end = performance.now();
        times.push(end - start);
    }
    
    const avg = times.reduce((a, b) => a + b) / times.length;
    const min = Math.min(...times);
    const max = Math.max(...times);
    
    console.log(`Performance Profile (${iterations} iterations):`);
    console.log(`Average: ${avg.toFixed(3)}ms`);
    console.log(`Min: ${min.toFixed(3)}ms`);
    console.log(`Max: ${max.toFixed(3)}ms`);
    console.log(`Rate: ${(text.length / avg).toFixed(0)} chars/ms`);
}

// Usage
analyzeText("kamusta");
profileTranslation("Kamusta ka aking kaibigan");
```

## 📚 Additional Resources

- **[Main Documentation](../README.md)** - Complete project documentation
- **[API Reference](../API.md)** - Detailed API documentation
- **[Contributing Guide](../CONTRIBUTING.md)** - How to contribute
- **[GitHub Repository](https://github.com/RyannKim327/Baybayin-Transliterator)** - Source code and issues

## 🤝 Contributing Examples

If you have additional examples or improvements to existing ones:

1. Fork the repository
2. Add your example to this directory
3. Update this README with your example
4. Submit a pull request

Example categories we'd love to see:
- Desktop application integration (Electron, Tauri)
- Game development integration (Unity, Godot)
- Educational tools and quizzes
- Data visualization with Baybayin
- API integrations with other services
- Browser extensions
- Discord/Telegram bots

---

For questions about these examples, please open an issue on the [GitHub repository](https://github.com/RyannKim327/Baybayin-Transliterator/issues).