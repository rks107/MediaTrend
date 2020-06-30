const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/uses/avatars');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    avatar: {
        type: String
    }
}, {
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    }, filename: function(req, file, cb) {
        cb(null, file.filename + '_' + Date.now());
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;