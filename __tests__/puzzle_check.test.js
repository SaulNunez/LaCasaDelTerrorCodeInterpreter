import { GetCodeOutput, CheckSyntax, GetVars, GetFunctions, TestFunctions } from '../src/CheckPuzzle/index.js';

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
        const testCode = fs.readFileSync(path.join(__dirname, './conditionals.txt'),{ encoding: 'utf8' });
        expect(CheckSyntax(testCode, 'IfStatement')).toBe(true);
    });

    test('returns correctly on cycles', () => {
        const testCode = fs.readFileSync(path.join(__dirname, './cycles.txt'),{ encoding: 'utf8' });
        expect(CheckSyntax(testCode, 'WhileStatement')).toBe(true);
    });
});

describe('check syntax gets function info', () => {
    test('detects function and parameters exists', () => {
        const testCode = fs.readFileSync(path.join(__dirname, './functions.txt'),{ encoding: 'utf8' });
        expect(GetFunctions(testCode)).toStrictEqual([{name: "test", parameters: ["a"]}]);
    });
});

describe('check functions output', () => {
    test('check with one function', () => {
        const testCode = fs.readFileSync(path.join(__dirname, './functions.txt'),{ encoding: 'utf8' });
        expect(TestFunctions(testCode, [{
            name: "test",
            parameters: ["mundo"]
        }])).toStrictEqual(['Hola mundo']);
    });
})