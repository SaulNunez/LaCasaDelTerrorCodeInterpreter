import Interpreter from 'js-interpreter';
const acorn = require("acorn");
const walk = require("acorn-walk");

export function CheckPuzzle(code, expectedOutput) {
    let output = "";
    const interpreter = new Interpreter(code, (interpreter, scope) => {
        // Add an API function for the alert() block.
        interpreter.setProperty(scope, 'alert',
            interpreter.createNativeFunction((text) => output.concat(text + ' ')));
    });

    interpreter.run();

    return output.trimRight() === expectedOutput;
}

export const availableChecks = ["CheckConditional", "CheckCyclicalStructures", "CheckFunction"];

export function CheckSyntaxForConstruct(checkType, code){
    let foundExpected = false;

    //Revisar que el codigo tiene los objetos necesarios
    if (checkType) {
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
            case "CheckConditional":
                foundExpected = found.ifs > 0;
                break;
            case "CheckCyclicalStructures":
                foundExpected = found.loops > 0;
                break;
            case "CheckFunction":
                foundExpected = found.func > 0;
                break;
        }
    } else {
        foundExpected = true;
    }

    return foundExpected;
}

export function CheckForDeclaredVariableDeclarationLiterals(){
    
}