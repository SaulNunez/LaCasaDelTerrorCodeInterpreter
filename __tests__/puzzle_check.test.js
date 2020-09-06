const GetCodeOutput = require('../src/CheckPuzzle/index.js');
const CheckSyntax = require('../src/CheckPuzzle/index.js');
const fs = require('fs');
const path = require('path');

describe('testing code output tests', () => {
    test('returns basic stuff', () => {
        const testCode = "alert('hello_world')";
        expect(GetCodeOutput(testCode)).toBe("hello_world");
    })
});

describe('testing syntax analysis result', () => {
    test('returns correctly on conditional', () => {
        const testCodeConditional = fs.readFileSync(path.join(__dirname, './conditionals.txt'),{ encoding: 'utf8' });
        expect(CheckSyntax(testCodeConditional, 'check_for_branching')).toBe(true);
    })
});