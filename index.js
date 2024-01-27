const express = require('express');
const app = express();
const port = 8000;


//use express router
app.use('/', require('./routes'));


//setting up the view engine
app.set('view engine', 'ejs');
app.use('views', './views');


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }


    console.log(`Server is running on port : ${port}`);
});