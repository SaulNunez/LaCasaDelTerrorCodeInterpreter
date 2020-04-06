import bodyParser from 'body-parser';
import Interpreter from 'js-interpreter';
const acorn = require("acorn");
const walk = require("acorn-walk");

const express = require('express');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

export enum Check {
    CHECK_NOTHING,
    CHECK_FOR_BRANCHING,
    CHECK_FOR_LOOPS,
    CHECK_FOR_FUNCTION
}

app.use('', (request: Express.Request, response: Express.Response) => {

});