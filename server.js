const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const passport = require('./Auth')



//Middle Ware Function 
//************************** *

/* 

In Summary , middleware is like a series of tasks that happen behind the scenes in a 
web application . It's a way to add extra functionality to your applications's request-response cycle,
such as logging , authentication checks ,or modifying request data before it reaches its final destination
*/

const logRequest = (req , res , next)=>{
    console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`);
    next();
    /*
       in Express next() is a callback that signals to express that the current middleware 
       function has completed its processing and that it's time to move on to the next middlewares 
       function or route handler in the chain.
    */
}

app.use(logRequest);


// ***** username , password - Authentication *******************

app.use('/' , passport.initialize());
const localAuthMiddleWare = passport.authenticate('local' , {session:false});
app.get('/' , localAuthMiddleWare , function(req , res){
    res.send('Login Successfull!')
})

const personRoutes = require('./routes/personRoutes');
app.use('/person' , personRoutes);

const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/menu' , menuItemRoutes);



app.listen(PORT, ()=>{
    console.log("server is listening at 3000");
})
  
  
  