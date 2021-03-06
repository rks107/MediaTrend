const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();
const port = 9000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customeMware = require('./config/middleware');

//setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
// console.log('chat server is listening on port 5000');
const path = require('path');

if (env.name == "development"){
  // SASS
  app.use(
    sassMiddleware({
      src: path.join(__dirname, env.asset_path, "scss"),
      dest: path.join(__dirname, env.asset_path, "css"),
      debug: false,
      outputStyle: "expanded",
      prefix: "/css",
    })
  );
}

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", '*');
  next();
});

// middleware
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static(env.asset_path));

// make the uploads path available to browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.mode, env.morgan.options))

app.use(expressLayouts);

// extract style and scripts from sub-pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo storeis used to store session cookie in the db
app.use(session({
    name: 'mediaTrend',
    // TODO change the secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'connect-mongodb setup ok');
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.checkAuthenticationUser);
// For Flashes
app.use(flash());
app.use(customeMware.setFlash);

// use express router
app.use('/',require('./routes'));

app.listen(port, function(err){
    if(err) {
        console.log(`Error in runing surver: ${err}`);
        return;
    }

    console.log(`Server is runing on port: ${port}`);
});