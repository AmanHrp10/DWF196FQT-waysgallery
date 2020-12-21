const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const cors = require('cors');
require('dotenv').config();
//? Require routes

const routes = require('./src/routes');

//? Default endpoint
app.use(express.json());
app.use(cors());
app.use('/api/v1', routes);
app.use('/uploads', express.static('uploads'));

app.listen(port, () => console.log(`server running on port ${port}`));
