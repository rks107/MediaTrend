const express = require('express');
const app = express();
const port = 9000;

// use express router
app.use('/',require('./routes'));

app.listen(port, function(err){
    if(err) {
        console.log(`Error in runing surver: ${err}`);
        return;
    }

    console.log(`Server is runing on port: ${port}`);
});