
const Post = require('../models/post');
const Comment = require('../models/comment');
const commentMailer = require('../mailers/comments_mailer');

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
    
            comment = await comment.populate('user', 'name email').execPopulate();
            commentMailer.newComment(comment);
            

            if(req.xhr) {
               // similar for comments to fetch user's id!
                // comment = await comment.populate('user', 'name').execPopulate();
                return res.status(200, {
                   data: {
                      comment: comment
                   },
                    message: 'Post Created!'
                });
            }
            
            req.flash('success', 'comment added');
            return res.redirect('/');
            
        }

    } catch(err) {
        req.flash('error', err);
        return res.redirect('/');
        // console.log("Error",err)
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

                req.flash('success','Comment Deleted!');
                return res.redirect('back');
            });
        // } else {
        //     res.redirect('back');
        // }
    } catch(err) {
        req.flash('error', err);
        return res.redirect('back');
        // console.log("Error",err);
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
