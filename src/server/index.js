//Include api modules.
const http = require('http');
const express = require('express');
const environment = require('dotenv').config();
const config = require('../../config');
const httpContext = require('express-http-context');
const { errorHandler } = require('./middleware/');

//Include middlewares.
const { notFound } = require('./middleware/');

//Define routes and events
const routes = require('./routes');
const events = require('./events.js');
const bodyParser = require('body-parser');

const { port } = config.server;

//Start Express-js.
const app = express();

//Add body parser-
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(httpContext.middleware);

//Create the server.
const server = http.createServer(app);

//Bind the api routes.
app.use('/health', routes.health);
app.use('*', notFound);
app.use(errorHandler);

// Start listen mode.
app.listen(port, async () => events.onListen(port));

//Define server "special" event to handle situations.
server.on('error', events.onServerError);
process.on('SIGINT', () => events.onProcessKill(server));
process.on('SIGTERM', () => events.onProcessKill(server));
process.on('unhandledRejection', events.onException);
process.on('uncaughtException', (err) => events.onException(err));
