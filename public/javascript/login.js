async function loginHandler(event) {
  event.preventDefault();

  // remove previous error message
  if (document.querySelector('.error')) {
    document.querySelector('.error').remove();
  }

  const username = document.querySelector('input[name="username"]').value.trim();
  const password = document.querySelector('input[name="password"]').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      console.log('success');
      // timeout to allow the session cookies to save before home page is reloaded
      setTimeout(() => {location.replace('/');}, 500);
    } else {
      const data = await response.json();
      // display error to user
      const errorMsg = document.createElement('p');
      errorMsg.className = 'error';
      errorMsg.textContent = data.message;
      document.querySelector('.login-signup h2').insertAdjacentElement('afterend', errorMsg);
    }

    // display error message to fill in missing field
  } else if (!username) {
    const errorMsg = document.createElement('p');
    errorMsg.className = 'error';
    errorMsg.textContent = "Username required";
    document.querySelector('.login-signup h2').insertAdjacentElement('afterend', errorMsg);
  } else {
    const errorMsg = document.createElement('p');
    errorMsg.className = 'error';
    errorMsg.textContent = "Password required";
    document.querySelector('.login-signup h2').insertAdjacentElement('afterend', errorMsg);
  }
}

document.querySelector('.login-signup').addEventListener('submit', loginHandler);