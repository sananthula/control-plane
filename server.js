//Import all required libraries
const http = require('http');
const app = require('./app');

//Port where server will listen
const port = process.env.PORT  || 3000;

//Server to listen requests
const server = http.createServer(app);


server.listen(port);