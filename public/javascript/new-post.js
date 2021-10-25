async function newPostHandler(event) {
  event.preventDefault();

  // remove previous error message
  if (document.querySelector('.error')) {
    document.querySelectorAll('.error').forEach(element => element.remove());
  }

  const title = document.querySelector('.form-title').value.trim();
  const content = document.querySelector('.form-content').value.trim();

  if (!title || !content) {
    // if there is no post content
    if (!content) {
      const errorMsg = document.createElement('p');
      errorMsg.className = 'error';
      errorMsg.textContent = "Text is required";
      document.querySelector('#post-form h2').insertAdjacentElement('afterend', errorMsg);
    }

    if (!title) {
      // if there is no post title
      const errorMsg = document.createElement('p');
      errorMsg.className = 'error';
      errorMsg.textContent = "Title is required";
      document.querySelector('#post-form h2').insertAdjacentElement('afterend', errorMsg);
    }
    return;
  }

  const response = await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({
      title,
      content
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    console.log('success');
    location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#post-form').addEventListener('submit', newPostHandler);