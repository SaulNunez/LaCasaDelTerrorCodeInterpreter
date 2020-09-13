import ESTraverse from 'estraverse';
import Interpreter from 'js-interpreter';
const acorn = require("acorn");
const walk = require("acorn-walk");
const esprima = require('esprima');

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

export function GetVars(code){
    let vars = {};

    const ast = esprima.parseScript(code);
    ESTraverse.traverse(ast, {
        enter: (node) => {
            if(node.type === 'VariableDeclaration'){
                node.declarations.forEach(declaration => {
                    if(declaration.init && declaration.init.value){
                        vars[declaration.id.name] = declaration.init.value;
                    }
                });
            }
        }
    });

    return vars;
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
        ConditionalExpression(node) {
            found.ifs++;
        },
        IfStatement(node, visitors) {
            found.ifs++;
        },
        ForStatement(node) {
            found.loops++;
        },
        WhileStatement(node) {
            found.loops++;
        },
        DoWhileStatement(node) {
            found.loops++;
        },
        FunctionExpression(node) {
            found.func++;
        }
    });

    console.log(found);

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