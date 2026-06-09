#!/usr/bin/env node

// Node.js CLI Calculator
// Supported operations:
// - Addition (add or +)
// - Subtraction (sub or -)
// - Multiplication (mul or * or x)
// - Division (div or /)

// Usage examples:
//   node src/calculator.js add 2 3    # prints 5
//   echo "mul 4 5" | node src/calculator.js
//   node src/calculator.js + 7 8
//   node src/calculator.js div 10 2

function printHelp() {
  console.log("Usage: calculator.js <operation> <a> <b>");
  console.log("Operations: add|+  sub|-  mul|*|x  div|/  mod|%  pow|^  sqrt");
  console.log("Examples:");
  console.log("  node src/calculator.js add 2 3  # 5");
  console.log("  node src/calculator.js mod 10 3  # 1");
  console.log("  node src/calculator.js pow 2 8   # 256");
  console.log("  node src/calculator.js sqrt 9    # 3");
  console.log("  echo \"mul 4 5\" | node src/calculator.js");
}

function parseNumber(s) {
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

// Returns the remainder of a divided by b
function modulo(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new Error('Invalid number input');
  }
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a % b;
}

// Returns base raised to exponent
function power(base, exponent) {
  if (!Number.isFinite(base) || !Number.isFinite(exponent)) {
    throw new Error('Invalid number input');
  }
  return Math.pow(base, exponent);
}

// Returns the square root of n; throws for negative inputs
function squareRoot(n) {
  if (!Number.isFinite(n)) {
    throw new Error('Invalid number input');
  }
  if (n < 0) {
    throw new Error('Cannot compute square root of negative number');
  }
  return Math.sqrt(n);
}

function compute(op, a, b) {
  switch (op) {
    case 'add':
    case '+':
      return a + b;
    case 'sub':
    case '-':
      return a - b;
    case 'mul':
    case '*':
    case 'x':
    case 'X':
      return a * b;
    case 'div':
    case '/':
      if (b === 0) {
        throw new Error('Division by zero');
      }
      return a / b;
    case 'mod':
    case '%':
      return modulo(a, b);
    case 'pow':
    case '^':
      return power(a, b);
    case 'sqrt':
      // square root is unary; use 'a' and ignore 'b'
      return squareRoot(a);
    default:
      throw new Error('Unsupported operation: ' + op);
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 && process.stdin.isTTY) {
    printHelp();
    process.exit(0);
  }

  let op, aStr, bStr;

  if (args.length >= 3) {
    op = args[0];
    aStr = args[1];
    bStr = args[2];
  } else {
    // Read from stdin
    const chunks = [];
    for await (const chunk of process.stdin) chunks.push(chunk);
    const input = chunks.join('').trim();
    if (!input) {
      console.error('No input provided');
      printHelp();
      process.exit(2);
    }
    const tokens = input.split(/\s+/);
    if (tokens.length < 3) {
      console.error('Expected: <operation> <a> <b>');
      printHelp();
      process.exit(2);
    }
    op = tokens[0];
    aStr = tokens[1];
    bStr = tokens[2];
  }

  if (['-h', '--help', 'help'].includes(op)) {
    printHelp();
    process.exit(0);
  }

  const a = parseNumber(aStr);
  const b = parseNumber(bStr);

  if (a === null || b === null) {
    console.error('Invalid number input:', aStr, bStr);
    process.exit(2);
  }

  try {
    const result = compute(op, a, b);
    // Print result in a concise form
    console.log(result);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(2);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  // Export functions for testing
  module.exports = { compute, parseNumber, modulo, power, squareRoot };
}

if (require.main === module) {
  main();
}
