#!/usr/bin/env node

/**
 * CLI Tool Example for Baybayin Transliterator
 * 
 * This example demonstrates how to create a command-line interface
 * for the Baybayin Transliterator package.
 * 
 * Usage:
 *   npx tsx cli-tool.ts "text to translate"
 *   npx tsx cli-tool.ts --file input.txt
 *   npx tsx cli-tool.ts --interactive
 */

import baybay from '../../src/index';
import { readFileSync, writeFileSync } from 'fs';
import { createInterface } from 'readline';

// ANSI color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m'
};

interface CLIOptions {
    text?: string;
    file?: string;
    output?: string;
    interactive?: boolean;
    help?: boolean;
    version?: boolean;
    verbose?: boolean;
    stats?: boolean;
}

class BaybayinCLI {
    private options: CLIOptions = {};

    constructor() {
        this.parseArguments();
    }

    private parseArguments(): void {
        const args = process.argv.slice(2);
        
        for (let i = 0; i < args.length; i++) {
            const arg = args[i];
            
            switch (arg) {
                case '--file':
                case '-f':
                    this.options.file = args[++i];
                    break;
                case '--output':
                case '-o':
                    this.options.output = args[++i];
                    break;
                case '--interactive':
                case '-i':
                    this.options.interactive = true;
                    break;
                case '--help':
                case '-h':
                    this.options.help = true;
                    break;
                case '--version':
                case '-v':
                    this.options.version = true;
                    break;
                case '--verbose':
                    this.options.verbose = true;
                    break;
                case '--stats':
                case '-s':
                    this.options.stats = true;
                    break;
                default:
                    if (!arg.startsWith('-')) {
                        this.options.text = args.slice(i).join(' ');
                        break;
                    }
            }
        }
    }

    public async run(): Promise<void> {
        if (this.options.help) {
            this.showHelp();
            return;
        }

        if (this.options.version) {
            this.showVersion();
            return;
        }

        if (this.options.interactive) {
            await this.runInteractiveMode();
            return;
        }

        if (this.options.file) {
            this.processFile();
            return;
        }

        if (this.options.text) {
            this.processText(this.options.text);
            return;
        }

        // No arguments provided
        this.showHelp();
    }

    private showHelp(): void {
        console.log(`
${colors.bright}${colors.cyan}Baybayin Transliterator CLI${colors.reset}

${colors.bright}USAGE:${colors.reset}
    baybayin-cli [OPTIONS] [TEXT]

${colors.bright}OPTIONS:${colors.reset}
    ${colors.green}-f, --file <file>${colors.reset}      Read input from file
    ${colors.green}-o, --output <file>${colors.reset}    Write output to file
    ${colors.green}-i, --interactive${colors.reset}      Start interactive mode
    ${colors.green}-s, --stats${colors.reset}           Show translation statistics
    ${colors.green}--verbose${colors.reset}             Show detailed output
    ${colors.green}-h, --help${colors.reset}            Show this help message
    ${colors.green}-v, --version${colors.reset}         Show version information

${colors.bright}EXAMPLES:${colors.reset}
    ${colors.dim}# Translate text directly${colors.reset}
    baybayin-cli "Kamusta ka?"

    ${colors.dim}# Translate from file${colors.reset}
    baybayin-cli --file input.txt

    ${colors.dim}# Save output to file${colors.reset}
    baybayin-cli "Hello world" --output result.txt

    ${colors.dim}# Interactive mode${colors.reset}
    baybayin-cli --interactive

    ${colors.dim}# Show statistics${colors.reset}
    baybayin-cli "Long text here" --stats --verbose
`);
    }

    private showVersion(): void {
        console.log(`${colors.bright}Baybayin Transliterator CLI${colors.reset}`);
        console.log(`Version: ${colors.green}0.0.3${colors.reset}`);
        console.log(`Node.js: ${colors.yellow}${process.version}${colors.reset}`);
    }

    private processText(text: string): void {
        const startTime = performance.now();
        const result = baybay(text);
        const endTime = performance.now();

        if (this.options.verbose) {
            console.log(`${colors.bright}Original:${colors.reset} ${result.original}`);
            console.log(`${colors.bright}Baybayin:${colors.reset} ${colors.cyan}${result.baybain}${colors.reset}`);
        } else {
            console.log(result.baybain);
        }

        if (this.options.stats) {
            this.showStats(text, endTime - startTime);
        }

        if (this.options.output) {
            this.writeToFile(this.options.output, result.baybain);
        }
    }

    private processFile(): void {
        if (!this.options.file) return;

        try {
            const content = readFileSync(this.options.file, 'utf-8');
            
            if (this.options.verbose) {
                console.log(`${colors.dim}Reading from: ${this.options.file}${colors.reset}`);
                console.log(`${colors.dim}File size: ${content.length} characters${colors.reset}\n`);
            }

            this.processText(content);

        } catch (error) {
            console.error(`${colors.red}Error reading file:${colors.reset} ${error.message}`);
            process.exit(1);
        }
    }

    private writeToFile(filename: string, content: string): void {
        try {
            writeFileSync(filename, content, 'utf-8');
            if (this.options.verbose) {
                console.log(`${colors.green}Output saved to: ${filename}${colors.reset}`);
            }
        } catch (error) {
            console.error(`${colors.red}Error writing file:${colors.reset} ${error.message}`);
            process.exit(1);
        }
    }

    private showStats(text: string, processingTime: number): void {
        const charCount = text.length;
        const wordCount = text.trim().split(/\s+/).length;
        const rate = charCount / processingTime;

        console.log(`\n${colors.bright}Statistics:${colors.reset}`);
        console.log(`  Characters: ${colors.yellow}${charCount}${colors.reset}`);
        console.log(`  Words: ${colors.yellow}${wordCount}${colors.reset}`);
        console.log(`  Processing time: ${colors.yellow}${processingTime.toFixed(2)}ms${colors.reset}`);
        console.log(`  Rate: ${colors.yellow}${rate.toFixed(0)} chars/ms${colors.reset}`);
    }

    private async runInteractiveMode(): Promise<void> {
        console.log(`${colors.bright}${colors.cyan}Baybayin Transliterator - Interactive Mode${colors.reset}`);
        console.log(`${colors.dim}Type text to translate, or 'quit' to exit${colors.reset}\n`);

        const rl = createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const askQuestion = (): Promise<string> => {
            return new Promise((resolve) => {
                rl.question(`${colors.green}> ${colors.reset}`, resolve);
            });
        };

        while (true) {
            try {
                const input = await askQuestion();
                
                if (input.toLowerCase().trim() === 'quit' || input.toLowerCase().trim() === 'exit') {
                    console.log(`${colors.dim}Goodbye!${colors.reset}`);
                    break;
                }

                if (input.trim() === '') {
                    continue;
                }

                if (input.trim() === 'help') {
                    console.log(`${colors.dim}Commands:${colors.reset}`);
                    console.log(`  ${colors.green}help${colors.reset}     - Show this help`);
                    console.log(`  ${colors.green}clear${colors.reset}    - Clear screen`);
                    console.log(`  ${colors.green}stats${colors.reset}    - Toggle statistics`);
                    console.log(`  ${colors.green}quit${colors.reset}     - Exit interactive mode`);
                    continue;
                }

                if (input.trim() === 'clear') {
                    console.clear();
                    console.log(`${colors.bright}${colors.cyan}Baybayin Transliterator - Interactive Mode${colors.reset}`);
                    continue;
                }

                if (input.trim() === 'stats') {
                    this.options.stats = !this.options.stats;
                    console.log(`${colors.dim}Statistics ${this.options.stats ? 'enabled' : 'disabled'}${colors.reset}`);
                    continue;
                }

                const startTime = performance.now();
                const result = baybay(input);
                const endTime = performance.now();

                console.log(`${colors.cyan}${result.baybain}${colors.reset}`);

                if (this.options.stats) {
                    this.showStats(input, endTime - startTime);
                }

            } catch (error) {
                console.error(`${colors.red}Error:${colors.reset} ${error.message}`);
            }
        }

        rl.close();
    }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error(`${colors.red}Uncaught Exception:${colors.reset} ${error.message}`);
    process.exit(1);
});

process.on('unhandledRejection', (reason) => {
    console.error(`${colors.red}Unhandled Rejection:${colors.reset} ${reason}`);
    process.exit(1);
});

// Main execution
if (require.main === module) {
    const cli = new BaybayinCLI();
    cli.run().catch((error) => {
        console.error(`${colors.red}CLI Error:${colors.reset} ${error.message}`);
        process.exit(1);
    });
}

export default BaybayinCLI;