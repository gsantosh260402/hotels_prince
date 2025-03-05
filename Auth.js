const passport  = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person');

passport.use(new LocalStrategy(async (username, password , done)=>{
    try{
         console.log('Received Credentials:', username , password);
         const user = await Person.findOne({username});

         if(!user){ // user not found

            // done(error , Authenticating object , message);
            return done(null , false , {message : 'Incorrect Username'});
         }
         const isPasswordMatch = await user.comparePassword(password);
         if(isPasswordMatch){ // matched successfully
            console.log("Login Successfull")
            return done(null , user);
         }
         else{
            console.log("Invalid password")
            return done(null , false , {message : 'Incorrect password'});
         }
    }catch(err){
        return done(err);
    }
}))

module.exports = passport