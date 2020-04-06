import Interpreter from 'js-interpreter';
const acorn = require("acorn");
const walk = require("acorn-walk");

export default function CheckPuzzle(puzzleResultSource, expectedOutput) {

    return GetStdOutput(puzzleResultSource) === expectedOutput;
}

export function GetStdOutput(code){
    let output = "";
    const interpreter = new Interpreter(code, (interpreter, scope) => {
        // Add an API function for the alert() block.
        interpreter.setProperty(scope, 'alert',
            interpreter.createNativeFunction((text) => output.concat(text + ' ')));
    });

    interpreter.run();

    return output.trimRight();
}

export function CheckSyntaxForConstruct(checkType, code){
    let foundExpected = false;

    //Revisar que el codigo tiene los objetos necesarios
    if (checkType != Check.CHECK_NOTHING) {
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

        switch(checkType){
            case Check.CHECK_FOR_BRANCHING:
                foundExpected = found.ifs > 0;
                break;
            case Check.CHECK_FOR_LOOPS:
                foundExpected = found.loops > 0;
                break;
            case Check.CHECK_FOR_FUNCTION:
                foundExpected = found.func > 0;
                break;
        }
    } else {
        foundExpected = true;
    }

    return foundExpected;
}