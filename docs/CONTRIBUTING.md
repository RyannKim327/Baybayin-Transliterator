# Contributing to Baybayin Transliterator

Thank you for your interest in contributing to the Baybayin Transliterator project! This guide will help you get started with contributing to this open-source project.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Submitting Changes](#submitting-changes)
- [Issue Reporting](#issue-reporting)
- [Feature Requests](#feature-requests)

## Code of Conduct

This project follows a simple code of conduct:
- Be respectful and inclusive
- Focus on constructive feedback
- Help maintain a welcoming environment for all contributors
- Respect the cultural significance of Baybayin script

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git
- Basic knowledge of TypeScript
- Understanding of Filipino language and Baybayin script (helpful but not required)

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
```bash
git clone https://github.com/YOUR_USERNAME/Baybayin-Transliterator.git
cd Baybayin-Transliterator
```

3. **Add upstream remote**:
```bash
git remote add upstream https://github.com/RyannKim327/Baybayin-Transliterator.git
```

## Development Setup

### Installation

```bash
# Install dependencies
npm install

# Verify TypeScript compilation
npx tsc --noEmit

# Run tests
npm test
```

### Project Structure Understanding

Before contributing, familiarize yourself with the project structure:

```
src/
├── index.ts          # Main entry point
├── functions.ts      # Core transliteration logic
├── variables.ts      # Character mappings and rules
└── interfaces.ts     # Type definitions
```

### Development Workflow

1. **Create a feature branch**:
```bash
git checkout -b feature/your-feature-name
```

2. **Make your changes** following the coding standards

3. **Test your changes**:
```bash
npm test
npx tsx test.ts
```

4. **Commit your changes**:
```bash
git add .
git commit -m "feat: add your feature description"
```

## How to Contribute

### Types of Contributions

1. **Bug Fixes**: Fix issues in the transliteration algorithm
2. **Feature Enhancements**: Add new functionality
3. **Documentation**: Improve or add documentation
4. **Performance**: Optimize existing code
5. **Testing**: Add or improve test coverage
6. **Localization**: Improve language-specific handling

### Areas Where Help is Needed

#### 1. Algorithm Improvements
- **Accuracy**: Improve transliteration accuracy for edge cases
- **Normalization**: Better handling of Spanish loanwords and modern terms
- **Regional Variants**: Support for different Baybayin writing styles

#### 2. Feature Development
- **Reverse Transliteration**: Baybayin to Latin conversion
- **CLI Interface**: Command-line tool
- **Web Interface**: Browser-based transliterator
- **API Enhancements**: Additional configuration options

#### 3. Testing and Quality
- **Test Coverage**: Add comprehensive test cases
- **Edge Cases**: Handle unusual input scenarios
- **Performance Testing**: Benchmark and optimize
- **Cross-platform Testing**: Ensure compatibility

#### 4. Documentation
- **Examples**: More usage examples
- **Tutorials**: Step-by-step guides
- **API Documentation**: Detailed function documentation
- **Cultural Context**: Educational content about Baybayin

## Coding Standards

### TypeScript Guidelines

1. **Use strict typing**:
```typescript
// Good
function processText(input: string): string {
  return input.toLowerCase();
}

// Avoid
function processText(input: any): any {
  return input.toLowerCase();
}
```

2. **Prefer explicit types**:
```typescript
// Good
const consonants: Map<string, number> = new Map([
  ["b", 5898],
  ["k", 5891],
]);

// Avoid
const consonants = new Map([
  ["b", 5898],
  ["k", 5891],
]);
```

3. **Use meaningful names**:
```typescript
// Good
function normalizeFilipinoPronunciation(text: string): string

// Avoid
function normalize(txt: string): string
```

### Code Style

1. **Indentation**: Use tabs (project standard)
2. **Line Length**: Maximum 80 characters when practical
3. **Semicolons**: Always use semicolons
4. **Quotes**: Use double quotes for strings
5. **Comments**: Document complex algorithms and Unicode mappings

### File Organization

1. **Imports**: Group and order imports logically
```typescript
// External libraries first
import { someLibrary } from "external-lib";

// Internal modules
import { normalizeText } from "./functions";
import { BAYBAYIN_CHARACRERS } from "./variables";
```

2. **Exports**: Use explicit exports
```typescript
// Good
export function normalizeText(input: string): string { }
export { BAYBAYIN_CHARACRERS };

// Avoid
export default { normalizeText, BAYBAYIN_CHARACRERS };
```

## Testing Guidelines

### Writing Tests

1. **Test Structure**:
```typescript
// test/transliteration.test.ts
import baybay from '../src';

describe('Baybayin Transliteration', () => {
  test('should transliterate basic words', () => {
    const result = baybay('kamusta');
    expect(result.baybain).toBe('ᜃᜋᜓᜐ᜔ᜆ');
  });

  test('should handle punctuation', () => {
    const result = baybay('Hello!');
    expect(result.baybain).toBe('ᜑᜒᜎ᜔ᜎᜓ᜶');
  });
});
```

2. **Test Categories**:
   - **Unit Tests**: Individual function testing
   - **Integration Tests**: Full transliteration workflow
   - **Edge Cases**: Empty strings, special characters
   - **Performance Tests**: Large text handling

3. **Test Data**:
```typescript
const testCases = [
  { input: "kamusta", expected: "ᜃᜋᜓᜐ᜔ᜆ", description: "basic greeting" },
  { input: "mga tao", expected: "ᜋᜅ ᜆᜀᜓ", description: "plural form" },
  { input: "computer", expected: "ᜃᜓᜋ᜔ᜉ᜔ᜌᜓᜆᜒᜇ᜔", description: "loanword" },
];
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npx tsx test/specific-test.ts

# Run with coverage (if configured)
npm run test:coverage
```

## Submitting Changes

### Pull Request Process

1. **Update your fork**:
```bash
git fetch upstream
git checkout main
git merge upstream/main
```

2. **Rebase your feature branch**:
```bash
git checkout feature/your-feature
git rebase main
```

3. **Push to your fork**:
```bash
git push origin feature/your-feature
```

4. **Create Pull Request** on GitHub

### Pull Request Guidelines

1. **Title**: Use descriptive titles
   - `feat: add reverse transliteration`
   - `fix: handle ng digraph correctly`
   - `docs: update API documentation`

2. **Description**: Include:
   - What changes were made
   - Why the changes were necessary
   - How to test the changes
   - Any breaking changes

3. **Checklist**:
   - [ ] Code follows project style guidelines
   - [ ] Tests pass locally
   - [ ] New tests added for new functionality
   - [ ] Documentation updated if needed
   - [ ] No breaking changes (or clearly documented)

### Commit Message Format

Use conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(transliteration): add support for Spanish loanwords

Implements better handling of Spanish-derived words in Filipino
by adding specific normalization rules for common patterns.

Closes #123
```

## Issue Reporting

### Bug Reports

When reporting bugs, include:

1. **Environment**:
   - Node.js version
   - Operating system
   - Package version

2. **Steps to Reproduce**:
```typescript
// Minimal reproduction case
import baybay from 'baybayin-transliterator';
const result = baybay('problematic text');
console.log(result); // Unexpected output
```

3. **Expected vs Actual Behavior**:
   - What you expected to happen
   - What actually happened
   - Screenshots if applicable

4. **Additional Context**:
   - Error messages
   - Related issues
   - Possible solutions

### Bug Report Template

```markdown
## Bug Description
Brief description of the issue

## Environment
- Node.js version: 
- Package version: 
- OS: 

## Steps to Reproduce
1. 
2. 
3. 

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Code Example
```typescript
// Minimal reproduction case
```

## Additional Context
Any other relevant information
```

## Feature Requests

### Proposing New Features

1. **Check existing issues** to avoid duplicates
2. **Describe the use case** clearly
3. **Provide examples** of how it would work
4. **Consider implementation complexity**
5. **Discuss cultural sensitivity** if applicable

### Feature Request Template

```markdown
## Feature Description
Clear description of the proposed feature

## Use Case
Why is this feature needed?

## Proposed Solution
How should this feature work?

## Example Usage
```typescript
// Example of how the feature would be used
```

## Alternatives Considered
Other approaches that were considered

## Additional Context
Any other relevant information
```

## Development Tips

### Understanding Baybayin

If you're new to Baybayin, here are helpful resources:
- [Baybayin Wikipedia](https://en.wikipedia.org/wiki/Baybayin)
- [Unicode Baybayin Block](https://unicode.org/charts/PDF/U1700.pdf)
- [Modern Baybayin Usage](https://www.baybayin.com/)

### Debugging Unicode

```typescript
// Useful for debugging character mappings
function debugUnicode(text: string) {
  for (let char of text) {
    console.log(`${char}: U+${char.charCodeAt(0).toString(16).toUpperCase()}`);
  }
}

debugUnicode("ᜃᜋᜓᜐ᜔ᜆ"); // Shows Unicode code points
```

### Performance Profiling

```typescript
// Simple performance testing
function profileTransliteration(text: string) {
  const start = performance.now();
  const result = baybay(text);
  const end = performance.now();
  console.log(`Processed ${text.length} characters in ${end - start}ms`);
  return result;
}
```

## Getting Help

### Communication Channels

- **GitHub Issues**: For bugs and feature requests
- **Email**: weryses19@gmail.com (project maintainer)
- **Facebook**: [MPOP.ph](https://facebook.com/MPOP.ph)

### Questions and Discussions

Before asking questions:
1. Check existing documentation
2. Search closed issues
3. Review the codebase
4. Try to create a minimal reproduction case

When asking for help:
1. Be specific about the problem
2. Provide context and examples
3. Show what you've already tried
4. Be patient and respectful

## Recognition

Contributors will be recognized in:
- Project README credits section
- Release notes for significant contributions
- GitHub contributors list

Thank you for contributing to the preservation and modernization of Baybayin script through technology!

## Acknowledgments

Special thanks to:
- **Qodo AI** for generating comprehensive documentation
- **Community contributors** for their ongoing support
- **Cultural advisors** for ensuring authenticity

---

For more information, visit the [project repository](https://github.com/RyannKim327/Baybayin-Transliterator) or contact the maintainer.