async function postRequestHandler(event) {
  // if delete icon is clicked
  if (event.target.className === 'post-delete-icon fas fa-times') {
    const postEl = event.target.parentNode.parentNode;
    const postId = postEl.id.split('post-')[1];

    const response = await fetch(`/api/posts/${postId}`, {method: 'DELETE'});

    if (response.ok) {
      console.log(`Post ${postId} deleted`)
      postEl.remove();
    } else {
      const data = await response.json();
      console.log(data);
    }
    // if edit icon is clicked
  } else if (event.target.className === 'post-edit-icon fas fa-edit') {
    const postEl = event.target.parentNode.parentNode;
    const postId = postEl.id.split('post-')[1];
    
    // if there are not textareas, create one to allow user to edit post
    if (document.querySelector(`#${postEl.id} .post-content`)) {
      const postTitleEl = document.querySelector(`#${postEl.id} .post-title`);
      const postContentEl = document.querySelector(`#${postEl.id} .post-content`);
    
    // create textareas to edit title and content
    const postEditTitleEl = document.createElement('textarea');
    postEditTitleEl.className = 'post-edit-title';
    postEditTitleEl.setAttribute('rows', 1);
    postEditTitleEl.value = postTitleEl.textContent;
    postTitleEl.replaceWith(postEditTitleEl);

    const postEditContentEl = document.createElement('textarea');
    postEditContentEl.className = 'post-edit-content';
    postEditContentEl.setAttribute('rows', 4);
    postEditContentEl.value = postContentEl.textContent;
    postContentEl.replaceWith(postEditContentEl);

    // if there is a textarea update the post in the database
    } else if (document.querySelector(`#${postEl.id} .post-edit-title`)) {
      const postEditTitleEl = document.querySelector(`#${postEl.id} .post-edit-title`);
      const postEditContentEl = document.querySelector(`#${postEl.id} .post-edit-content`);

      // update post in database
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: postEditTitleEl.value.trim(),
          content: postEditContentEl.value.trim()
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        console.log('Success');

        // reset title and content of post
        const postTitleEl = document.createElement('h2');
        postTitleEl.className = 'post-title';
        postTitleEl.textContent = postEditTitleEl.value.trim();
        postEditTitleEl.replaceWith(postTitleEl);

        const postContentEl = document.createElement('p');
        postContentEl.className = 'post-content';
        postContentEl.textContent = postEditContentEl.value.trim();
        postEditContentEl.replaceWith(postContentEl);
      } else {
        const data = await response.json();
        console.log(data);
      }
    }
  } 
}

document.querySelector('#posts').addEventListener('click', postRequestHandler);