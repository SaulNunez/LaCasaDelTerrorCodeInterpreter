import Interpreter from 'js-interpreter';

const MAX_EMULATOR_STEP_COUNT = 1000

export default function CheckPuzzle(code){
    let output = "";
    const interpreter = new Interpreter(code, (interpreter, scope) => {
        interpreter.setProperty(scope, 'alert',
            interpreter.createNativeFunction((text) => output.concat(text + ' ')));
    });

    let runCount = 0;

    // Evitar que un loop infinito afecte al servidor
    while(runCount < MAX_EMULATOR_STEP_COUNT 
        && interpreter.step()) {
        runCount++;
    }

    if(runCount >= MAX_EMULATOR_STEP_COUNT){
        return null;
    }

    return "";
}