const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());

//informa as requisições estão retornando json
app.use(express.json()); 

app.use(routes);

app.listen(3333);