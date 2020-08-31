const fs = require('fs');
const rfs = require("rotating-file-stream");

const path = require('path');

const logDirectory = path.join(__dirname, '../prodction_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    interval: '1d',
    path: logDirectory
});

const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'blahsomething',
    db: 'mediaTrend_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'developer.rks107',
            pass: 'Rohit@107'
        }
    },
    google_client_id: "313233209747-dnqmail3j800a2jvsuckqhohodhs7i63.apps.googleusercontent.com",
    google_client_secret: "0FXb5EBWa4xRfJ8jR-1HKMd2",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'mediaTrend',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}


const production =  {
    name: 'production',
    asset_path: process.env.MEDIATREND_ASSET_PATH,
    session_cookie_key: process.env.MEDIATREND_SESSION_COOKIE_KEY,
    db: process.env.MEDIATREND_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.MEDIATREND_GMAIL_USERNAME,
            pass: process.env.MEDIATREND_GMAIL_PASSWORD
        }
    },
    google_client_id: process.env.MEDIATREND_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.MEDIATREND_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.MEDIATREND_GOOGLE_CALL_BACK_URL,
    jwt_secret: process.env.MEDIATREND_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}




module.exports = eval(process.env.MEDIATREND_ENVIRONMENT) == undefined ? development : eval(process.env.MEDIATREND_ENVIRONMENT);