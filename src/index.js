import bodyParser from 'body-parser';
import express from 'express';
import { availableChecks, CheckSyntaxForConstruct } from './CheckPuzzle';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', (request, response) => {
    // Body parser converte el la entrada a eleemntos del objeto de request
    let code = request.body.code || "";
    
    if(!code){
        // Si el codigo a convertir no existe, responder que esta malformada
        response.sendStatus(400);
        return;
    }

    let checkType = request.body.checkType || "";
    if(!checkType || !availableChecks.findIndex(x => x === checkType) != -1){
        response.sendStatus(400);
        return;
    }

    let literalAsign = request.body.declaredVariables || {};

    let expectedOutput = request.body.expectedOutput || "";

    response.send({
        outputChecked: expectedOutput? CheckPuzzle(code): null,
        varCheck: literalAsign? CheckForDeclaredVariableDeclarationLiterals(code, literalAsign): null,
        syntaxCheck: CheckSyntaxForConstruct(checkType, code)
    });
});

app.listen(3000);