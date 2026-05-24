# AutoTest Runner

A fully-functional JavaScript test case generator that parses your functions, generates meaningful test cases, and runs them in the browser.

## Features

- **Function Parsing** – Automatically detects `function`, `const = function`, and arrow function syntax
- **Parameter Type Inference** – Analyzes parameter names to infer types (number, string, boolean, array, object)
- **Test Generation** – Creates `describe`/`it`/`expect` test suites with sensible edge cases
- **In-Browser Runner** – Executes generated tests and shows pass/fail results with error details
- **Coverage Metrics** – Calculates function, line, branch, and overall coverage percentages
- **Export** – Download generated test file as `generated_tests.js`
- **Copy to Clipboard** – One-click copy of generated test code

## Usage

1. Open `index.html` in any modern browser
2. Paste your JavaScript function(s) into the textarea
3. Click **Analyze & Generate Tests**
4. Review generated tests in the **Generated Tests** tab
5. Click **Run Tests** to execute and see results
6. Check the **Coverage** tab for metrics
7. Export or copy the generated test code

## Supported Function Syntax

```js
function add(a, b) { return a + b; }
const multiply = function(x, y) { return x * y; }
const greet = (name) => { return "Hello " + name; }
const double = n => { return n * 2; }
```

## File Structure

- `index.html` – Main page layout
- `style.css` – Dark theme styling
- `app.js` – Core logic (parser, generator, runner, coverage)
- `README.md` – This file

## How It Works

### Parsing
Uses regex to detect function declarations and assignments, then brace-matches to extract function bodies.

### Type Inference
Maps common parameter names (e.g., `n`, `count`, `is_active`, `arr`) to types using naming conventions.

### Test Generation
For each function, generates:
- Basic invocation test with sensible defaults
- Zero/empty input test
- Edge case tests for each parameter based on its inferred type
- Return type validation test
- Non-null/non-undefined assertions

### Coverage
Calculates four metrics:
- **Function Coverage** – percentage of detected functions with tests
- **Line Coverage** – ratio of test cases to lines of code
- **Branch Coverage** – detects if/else/switch/ternary branches and estimates coverage
- **Overall** – weighted average of the above

## License

MIT
