const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
    // the user who send the request
    from_user: {
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    //the user whos accept the request
    to_user: {
        type: mongoose.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps: true
});


const Friendship = model('Friendship', friendshipSchema);
module.exports = Friendship;