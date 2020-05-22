const express = require('express');
const app = express();
const port = 9000;
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);

// use express router
app.use('/',require('./routes'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err) {
        console.log(`Error in runing surver: ${err}`);
        return;
    }

    console.log(`Server is runing on port: ${port}`);
});