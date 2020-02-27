const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');


//Rest Api Controller 
const helloNode = require('./api/routes/helloworld');
const userRoutes = require('./api/routes/users');

// app.use((req, res, next) => {
//    res.status(200).json({
//        message: 'Hello World!, It works!'
//    });
// });

//Generate logging 
app.use(morgan('dev'));

//body parsers 
app.use(bodyparser.urlencoded({extended: false})); //Rich data in it
app.use(bodyparser.json());

//Routes to pass the requests 
app.use('/hello',helloNode);
app.use('/users',userRoutes);

//Headers every request to pass cors
app.use((req,res,next) =>{
  res.header("Access-Control-Allow-Origin","*"); //Restricting unwanted access then specify exact pattern
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-Type, Accept, Authorization");
  if( req.method == 'OPTIONS'){
      res.header("Access-Control-Allowed-Methods",'PUT, POST, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

//Error handling - Reaching here means request api is not able to handle above routes
app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);

});

app.use((error, req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;