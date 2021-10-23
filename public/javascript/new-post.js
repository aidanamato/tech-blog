async function newPostHandler(event) {
  event.preventDefault();

  const title = document.querySelector('.form-title').value.trim();
  const content = document.querySelector('.form-content').value.trim();

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