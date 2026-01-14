# Test Fixtures

This directory contains test files to verify the oxlint configuration works correctly.

## Structure

- `should-pass/` - Valid code that should pass all lint rules
- `should-fail/` - Code with intentional errors that should be caught by the linter

## Running Tests

```bash
# Run all tests
node --run test

# Run only should-pass tests (expect no errors)
node --run test:pass

# Run only should-fail tests (expect errors to be detected)
node --run test:fail
```

## Purpose

These fixtures help ensure that:

1. **Config is valid** - If `test:pass` fails, the config may have syntax errors or overly strict rules
2. **Config is complete** - If `test:fail` passes without errors, important rules may be disabled
3. **Changes don't break rules** - Run tests after modifying `oxlint.json` to verify changes
