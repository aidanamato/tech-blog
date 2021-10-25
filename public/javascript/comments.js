async function commentsHandler(event) {
  if (event.target.className === 'show-comments') {
    const viewCommentsEl = event.target;
    const postEl = event.target.parentNode;

    // add hide comments text
    const hideCommentsEl = document.createElement('p');
    hideCommentsEl.className = 'hide-comments';
    hideCommentsEl.textContent = 'Hide comments';
    viewCommentsEl.replaceWith(hideCommentsEl);

    // dynamically create commentEl div
    const commentDivEl = document.createElement('div');
    
    // create comment input element and submit button
    commentDivEl.innerHTML = `
<input class="comment-input" placeholder="New comment..."></input>`
    hideCommentsEl.parentNode.insertBefore(commentDivEl, hideCommentsEl);
    
    // add event listener to input element
    document.querySelector(`#${postEl.id} input.comment-input`).addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
          // post comment to database
          const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
              content: event.target.value.trim(),
              post_id: postEl.id.split('post-')[1]
            }),
            headers: {
              'Content-type': 'application/json'
            }
          });
          
          if (response.ok) {
            console.log('success');

            const commentEl = document.createElement('p');
            commentEl.textContent = event.target.value.trim();
            commentDivEl.prepend(commentEl);
          } else {
            const data = await response.json();
            console.log(data);
          }

          event.target.value = '';
        }
    });

    // add event listener to hideCommentsEl
    hideCommentsEl.addEventListener('click', () => {
      hideCommentsEl.replaceWith(viewCommentsEl);
      commentDivEl.remove();
    });
  }
}

document.querySelector('#posts').addEventListener('click', commentsHandler);