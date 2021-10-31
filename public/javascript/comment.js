async function commentsHandler(event) {
  if (event.target.className === 'show-comments') {
    const viewCommentsEl = event.target;
    const postEl = event.target.parentNode;
    const postId = postEl.id.split('post-')[1];

    // add hide comments text
    const hideCommentsEl = document.createElement('p');
    hideCommentsEl.className = 'hide-comments';
    hideCommentsEl.textContent = 'Hide comments';
    viewCommentsEl.replaceWith(hideCommentsEl);

    // dynamically create commentsContainerEl
    const commentsContainerEl = document.createElement('div');
    commentsContainerEl.className = 'post-comments-container';
    commentsContainerEl.innerHTML = '<div class="comments"></div>';
    hideCommentsEl.parentNode.insertBefore(commentsContainerEl, hideCommentsEl);

    const commentsEl = document.querySelector(`#${postEl.id} .comments`);

    // create comment textarea element if logged in
    if (document.querySelector('a[href="/dashboard"]')) {
      const commentTextareaEl = document.createElement('textarea');
      commentTextareaEl.className = 'comment-textarea';
      commentTextareaEl.setAttribute('placeholder', 'Add a comment...');
      commentsContainerEl.insertBefore(commentTextareaEl, commentsEl);
    }

    // get comments from database
    displayComment(commentsEl, postId);

    if (document.querySelector(`#${postEl.id} .comment-textarea`)) {
      document.querySelector(`#${postEl.id} .comment-textarea`).addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
          // post comment to database
          const postResponse = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
              content: event.target.value.trim(),
              post_id: postId
            }),
            headers: {
              'Content-type': 'application/json'
            }
          });

          if (postResponse.ok) {
            commentsEl.innerHTML = '';
            displayComment(commentsEl, postId);

          } else {
            const data = await postResponse.json();
            console.log(data);
          }

          event.target.value = '';
        }
      });
    }

    // add event listener to hideCommentsEl
    hideCommentsEl.addEventListener('click', () => {
      commentCount = document.querySelectorAll(`#${postEl.id} .comment`).length;
      viewCommentsEl.textContent = `${commentCount} comments`;
      if (commentCount === 1) {
        viewCommentsEl.textContent = '1 comment';
      }
      
      hideCommentsEl.replaceWith(viewCommentsEl);
      commentsContainerEl.remove();
    });
  }
}

// function to create and display comment element
async function displayComment(commentsEl, postId) {
  const getResponse = await fetch(`/api/comments/${postId}`);

    if (getResponse.ok) {
      // dynamically display comments
      const responseData = await getResponse.json();
      const commentsArr = responseData.comments;

      commentsArr.map(comment => {
        const commentEl = document.createElement('div');
        commentEl.className = `comment comment-${comment.id}`;
        
        // if comment belongs to user include delete icon
        if (comment.is_user_comment) {
          commentEl.innerHTML = `
<div class="comment-header">
  <p class="comment-info"><a href="/user/${comment.user_id}">${comment.user.username}</a> on ${comment.created_at}</p>
  <i class="comment-delete fas fa-times"></i>
</div>
<p class="comment-content">${comment.content}</p>`;
        } else {

          commentEl.innerHTML = `
<p class="comment-info"><a href="/user/${comment.user_id}">${comment.user.username}</a> on ${comment.created_at}</p>
<p class="comment-content">${comment.content}</p>`
        }

        commentsEl.appendChild(commentEl);

        commentEl.addEventListener('click', deleteCommentsHandler);
      });
    }
}

// function to allow user to delete comments
async function deleteCommentsHandler(event) {
  if (event.target.className === 'comment-delete fas fa-times') {
    const commentEl = event.target.parentNode.parentNode;
    const commentId = commentEl.className.split('-')[1];

    const response = await fetch(`/api/comments/${commentId}`, {method: 'DELETE'});

    if (response.ok) {
      console.log(`Comment ${commentId} deleted`);
      commentEl.remove();
    } else {
      const data = await response.json();
      console.log(data);
    }
  }
}

document.querySelector('#posts').addEventListener('click', commentsHandler);