require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleErrors = require('./middlewares/handleErrors');
const router = require('./routes/index');
const limiter = require('./middlewares/limiter');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors({ credentials: true, origin: ['https://localhost:3000', 'http://localhost:3000', 'https://api.mishenkadiplom.nomoredomains.xyz', 'http://api.mishenkadiplom.nomoredomains.xyz', 'http://mishenkadiplom.nomoredomains.xyz', 'https://mishenkadiplom.nomoredomains.xyz'] }));
mongoose.connect('mongodb://localhost:27017/moviesdb');
app.use(bodyParser.json());
app.use(helmet());
app.use(limiter);
app.use(requestLogger);
app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(handleErrors);
app.listen(PORT);
