import bodyParser from 'body-parser';
const express = require('express')
import { GetCodeOutput, CheckSyntax, TestFunctions } from  './src/CheckPuzzle/index.js';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', (request, response) => {
    // Body parser converte el la entrada a eleemntos del objeto de request
    const code = request.body.code || "";
    
    if(!code){
        // Si el codigo a convertir no existe, responder que esta malformada
        response.sendStatus(400);
        return;
    }

    const checkType = request.body.checkType || "";
    const expectedOutput = request.body.expectedOutput || "";
    const checkFunctionExists = request.body.checkFunctionExists || [];
    const functionChecks = request.body.functionChecks || [];

    let typeCheckResult = false;
    let functionsFound = false;
    let functionsPassedCheck = false;

    if(checkType === 'check_for_branching'){
        typeCheckResult = CheckSyntax(code, 'IfStatement');
    } else if(checkType === 'check_for_loops'){
        typeCheckResult = CheckSyntax(code, 'WhileStatement') || CheckSyntax(code, 'ForStatement') || CheckSyntax(code, 'DoWhileStatement');
    } else if(checkType === 'check_for_functions'){
        const functionsInCode = GetFunctions(code);
        functionsFound = functionsInCode.every(fExpected => functionsInCode.findIndex(fFound => fFound.name === fExpected.name) !== -1);
        functionsPassedCheck = TestFunctions(code, functionChecks).every((result, i) => result === functionsPassedCheck[i].output)
    }

    const output = GetCodeOutput(code);

    response.send({
        runOutput: output,
        matchesOutput: expectedOutput? output.join('') === expectedOutput: true,
        passedCheck: checkType? typeCheckResult : true,
        hasFunctions: checkFunctionExists? functionsFound: true,
        passedFunctionChecks: functionsChecks? functionsPassedCheck : true
    });
});

const port = process.env.PORT || 9000;

app.listen(port, () => console.log(`Server started on port ${port}`));