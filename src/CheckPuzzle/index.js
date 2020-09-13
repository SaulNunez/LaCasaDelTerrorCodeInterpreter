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

export function CheckSyntax(code, checkType) {
    let found = false;

    const ast = esprima.parseScript(code);
    ESTraverse.traverse(ast, {
        enter: (node) => {
            if(node.type === checkType){
                found = true;
            }
        }
    });

    return found;
}