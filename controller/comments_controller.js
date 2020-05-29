
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res) {

    try {

        let post = await Post.findById(req.body.post);

        if(post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();

            res.redirect('/');
            
        }

    } catch(err) {
        console.log("Error",err)
    }

    // Post.findById(req.body.post , function(err, post){
    //     if(post) {
    //         Comment.create({
    //             content: req.body.content,
    //             post: req.body.post,
    //             user: req.user._id
    //         }, function(err, comment){
    //             if(err) {
    //                 console.log('Error in creating coments');
    //                 return;
    //             }

    //             post.comments.push(comment);
    //             post.save();

    //             res.redirect('/');
    //         });
    //     }
    // });
}

module.exports.destroy = async function(req, res) {
    try {
        let comment = await Comment.findById(req.params.id);
        // if(comment.user == req.user.id) {
            let postId = comment.post;

            comment.remove();

            Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id}}, function(err, post){
                return res.redirect('back');
            });
        // } else {
        //     res.redirect('back');
        // }
    } catch(err) {
        console.log("Error",err);
    }
    // Comment.findById(req.params.id, function(err, comment){
    //     if(comment.user == req.user.id) {
    //         let postId = comment.post;

    //         comment.remove();

    //         Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id}}, function(err, post){
    //             return res.redirect('back');
    //         });
    //     } else {
    //         res.redirect('back');
    //     }
    // });
}
