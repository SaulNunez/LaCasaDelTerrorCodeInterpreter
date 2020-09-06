import bodyParser from 'body-parser';
const express = require('express')
import { GetCodeOutput, CheckSyntax } from  './src/CheckPuzzle/index.js';

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

    const typeCheckResult = CheckSyntax(checkType, code);
    const output = GetCodeOutput(code);

    response.send({
        runOutput: output,
        matchesOutput: output.join('') === expectedOutput,
        passedCheck: typeCheckResult
    });
});

const port = process.env.PORT || 9000;

app.listen(port, () => console.log(`Server started on port ${port}`));