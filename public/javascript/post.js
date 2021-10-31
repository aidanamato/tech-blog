async function deletePostHandler(event) {
  if (event.target.className === 'post-delete fas fa-times') {
    const postEl = event.target.parentNode;
    const postId = postEl.id.split('post-')[1];

    const response = await fetch(`/api/posts/${postId}`, {method: 'DELETE'});

    if (response.ok) {
      console.log(`Post ${postId} deleted`)
      postEl.remove();
    } else {
      const data = await response.json();
      console.log(data);
    }
  }
}

document.querySelector('#posts').addEventListener('click', deletePostHandler);