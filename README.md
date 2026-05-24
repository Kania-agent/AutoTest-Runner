# 🧪 AutoTest Runner

> AI-powered test generation and execution dashboard — powered by MiMo V2.5

## Why This Exists

Writing tests is the most universally acknowledged "should do" in software engineering — and the most universally skipped. Teams know that comprehensive test coverage prevents regressions and enables confident refactoring, but manually writing unit tests, integration tests, and edge case scenarios is tedious, time-consuming, and requires understanding both the code and its intended behavior. The result: most codebases hover around 30-40% coverage, and critical bugs ship to production because "we didn't have time to write tests for that."

AutoTest Runner uses MiMo V2.5 — Nous Research's code reasoning model — to analyze source code, understand function contracts, infer edge cases, and generate comprehensive test suites automatically. It doesn't just wrap every function in a try-catch and call it tested; it generates meaningful assertions, boundary condition tests, error path coverage, and even integration scenarios based on call graph analysis.

The dashboard gives engineering teams a single pane of glass for test generation, execution, and coverage tracking. Generate tests for a module, review them before committing, run the full suite, and watch coverage climb in real time. It's the fastest path from "we should write tests" to "we have 90%+ coverage."

## Architecture

```
┌──────────────────┐
│  Source Code      │   Python, JS/TS, Go, Rust, Java
│  (Repository)     │   files or directories
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│    Analyzer       │   MiMo V2.5 — AST parsing, function contract
│  (MiMo V2.5)     │   extraction, call graph, dependency mapping
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Test Generator   │   MiMo V2.5 — edge case discovery, assertion
│  (MiMo V2.5)     │   generation, mock creation, scenario design
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Coverage Checker  │   Line, branch, and function coverage analysis
│  (Codecov/CLI)   │   with gap identification and recommendations
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│     Report        │   Coverage metrics, test results, execution
│   (Dashboard)     │   times, flaky test detection, trend charts
└──────────────────┘
```

## Token Consumption Model

| Agent | Tokens/Op | Frequency | Daily/User (est.) |
|-------|-----------|-----------|-------------------|
| Analyzer | 200K | ~10 analyses/day | 2.0M |
| Test Generator | 700K | ~8 generation runs/day | 5.6M |
| Coverage Checker | 150K | ~10 checks/day | 1.5M |
| **Total** | **1.05M** | — | **~9.1M** |

> Token estimates based on analyzing an average module of 500 LOC and generating 50-80 test cases per run.

## Features

- 🔬 **Source code analysis** — Deep AST parsing with MiMo V2.5 to understand function signatures, types, and contracts
- 🧩 **Intelligent test generation** — Edge cases, boundary conditions, error paths, and type-based fuzzing inputs
- 📊 **CSS-only coverage pie chart** — Visual line/branch/function coverage breakdown without charting libraries
- ✅ **Test case table** — Status badges (pass/fail/skip), execution duration, and assertion counts per test
- 🔄 **Incremental generation** — Only generates tests for changed code since last run
- 🐛 **Flaky test detection** — Identifies non-deterministic tests that pass/fail inconsistently
- 📈 **Coverage trends** — Historical coverage chart showing improvement over time
- 🏃 **One-click test runner** — Execute the full suite or filter by file, tag, or priority
- 📋 **Export & CI integration** — Download test files or push directly to your test directory

## Tech Stack

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+)
- **AI Engine:** MiMo V2.5 by Nous Research
- **Architecture:** Zero-dependency — no external frameworks or build tools
- **Coverage:** Custom coverage instrumentation with lcov output support
- **Languages:** Python, JavaScript/TypeScript, Go, Rust, Java (expanding)

## Quick Start

```bash
# Clone the repository
git clone https://github.com/your-org/AutoTest-Runner.git
cd AutoTest-Runner

# Open the test dashboard
open index.html

# Or serve locally
python3 -m http.server 8080
```

1. Open `index.html` in your browser
2. The dashboard loads with a sample project and pre-generated tests
3. Click **"Generate Tests"** to see MiMo V2.5 analyze source and produce test cases
4. Review generated tests in the test case table — click any row for details
5. Hit **"Run Suite"** to execute and see pass/fail results with coverage update
6. Check the coverage pie chart for current line/branch/function metrics

## Project Structure

```
AutoTest-Runner/
├── index.html                  # Dashboard entry point
├── css/
│   ├── main.css                # Core theme and layout
│   ├── tests.css               # Test table and status styles
│   └── charts.css              # Coverage pie chart and trend graph
├── js/
│   ├── app.js                  # Main application controller
│   ├── analyzer.js             # MiMo V2.5 source code analysis
│   ├── test-gen.js             # Test case generation engine
│   ├── coverage.js             # Coverage calculation and reporting
│   ├── runner.js               # Test execution orchestration
│   └── config.js               # Language support and project settings
├── data/
│   ├── sample-project/         # Example source code for demo
│   └── generated-tests/        # Pre-generated test files
├── assets/
│   └── icons/                  # Status and action icons
└── README.md
```

---

> Built with MiMo V2.5 — [Nous Research](https://nousresearch.com)
