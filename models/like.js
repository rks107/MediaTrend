const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    //this define Object Id of the liked Object
    likeable: {
       type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    // This field is used for defining the type of liked object since this is a dynamic referance
    onModel: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    }
}, {
    timestamps: true
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;