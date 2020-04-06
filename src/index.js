import bodyParser from 'body-parser';
import express from 'express';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', (request, response) => {
    // Body parser converte el la entrada a eleemntos del objeto de request
    let code = request.body.code || "";
    
    if(!code){
        // Si el codigo a convertir no existe, responder que esta malformada
        response.sendStatus(400);
    }

    let checkType = {}
});

app.listen(3000);