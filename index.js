const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
require('dotenv').config();
//? Require routes

const routes = require('./src/routes');

//? Default endpoint
app.use(express.json());
app.use('/api/v1', routes);

app.listen(port, () => console.log(`server running on port ${port}`));
