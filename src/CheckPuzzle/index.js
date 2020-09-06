import Interpreter from 'js-interpreter';
const acorn = require("acorn");
const walk = require("acorn-walk");

const MAX_EMULATOR_STEP_COUNT = 1000

export function GetCodeOutput(code) {
    let output = [];
    const interpreter = new Interpreter(code, (interpreter, scope) => {
        interpreter.setProperty(scope, 'alert',
            interpreter.createNativeFunction((text) => output.push(text)));
    });

    let runCount = 0;

    // Evitar que un loop infinito afecte al servidor
    while (runCount < MAX_EMULATOR_STEP_COUNT
        && interpreter.step()) {
        runCount++;
    }

    if (runCount >= MAX_EMULATOR_STEP_COUNT) {
        return null;
    }

    return output;
}

export function CheckSyntax(checkType, code) {
    let foundExpected = false;

    //Revisar que el codigo tiene los objetos necesarios
    let found = {
        ifs: 0,
        loops: 0,
        func: 0,
        vars: {}
    }
    walk.simple(acorn.parse(code), {
        ConditionalExpression: () => {
            found.ifs++;
        },
        IfStatement: () => {
            found.ifs++;
        },
        ForStatement: () => {
            found.loops++;
        },
        WhileStatement: () => {
            found.loops++;
        },
        DoWhileStatement: () => {
            found.loops++;
        },
        FunctionExpression: () => {
            found.func++;
        }
    });

    switch (checkType) {
        case 'check_for_branching':
            foundExpected = found.ifs > 0;
            break;
        case 'check_for_loops':
            foundExpected = found.loops > 0;
            break;
        case 'check_for_functions':
            foundExpected = found.func > 0;
            break;
    }

    return foundExpected;
}