{
    // method to submit the for data for new post using AJAX 
    let createPost = function() {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data) {
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    // console.log(data.data.post.content);
                }, error(error) {
                    console.log(error.responseText);
                }

            });
            
        });
    }

    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}" class="container">

        <div class="container-header">
    
            <h3> ${ post.user.name } </h3>
    
            <a class="delete-post-button" href="/posts/destroy/${post.id}"> X </a>
    
        </div>
        
        <div class="post-container-content">
            ${ post.content }
        </div>
    
        <div class="post-comments-list">
                <ul id="post-comments-${ post._id }">
                </ul>
        </div>
    
        <div class="post-container-footer">
           
                <form action="comments/create" method="POST">
                    <input class="comment-input" type="text" name="content" placeholder="Add a comment...">
                    <input type="hidden" name="post" value="${ post._id }">
                    <input type="submit" value="post">
                </form>
           
        </div>
        
    </li>`)
    }



    // Method to delete apost from DOM

    createPost();
}

