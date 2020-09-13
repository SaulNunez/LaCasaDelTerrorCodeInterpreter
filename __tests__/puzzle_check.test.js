import { GetCodeOutput, CheckSyntax, GetVars } from '../src/CheckPuzzle/index.js';

const fs = require('fs');
const path = require('path');

describe('testing code output tests', () => {
    test('returns basic stuff', () => {
        const testCode = "alert('hello_world')";
        expect(GetCodeOutput(testCode)).toStrictEqual(["hello_world"]);
    })
});

describe('test variables in code', () => {
    test('test simple variable in code', () => {
        expect(GetVars(' const x=42;')).toStrictEqual({x: 42});
    });
})

describe('testing syntax analysis result', () => {
    test('returns correctly on conditional', () => {
        const testCodeConditional = fs.readFileSync(path.join(__dirname, './conditionals.txt'),{ encoding: 'utf8' });
        expect(CheckSyntax(testCodeConditional, 'IfStatement')).toBe(true);
    });

    test('returns correctly on cycles', () => {
        const testCodeConditional = fs.readFileSync(path.join(__dirname, './cycles.txt'),{ encoding: 'utf8' });
        expect(CheckSyntax(testCodeConditional, 'WhileStatement')).toBe(true);
    });
});