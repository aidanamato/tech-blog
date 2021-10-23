async function signupHandler(event) {
  event.preventDefault();

  // remove previous error message
  if (document.querySelector('.error')) {
    document.querySelector('.error').remove();
  }

  const username = document.querySelector('input[name="username"]').value.trim();
  const password = document.querySelector('input[name="password"]').value.trim();
  const passwordConfirm = document.querySelector('input[name="password-confirm"]').value.trim();

  if (password !== passwordConfirm) {
    const errorMsg = document.createElement('p');
    errorMsg.className = 'error';
    errorMsg.textContent = "Passwords do not match";
    document.querySelector('#login-signup h2').insertAdjacentElement('afterend', errorMsg);
    return;
  }

  if (username && password) {
    const response = await fetch('/api/users', {
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
      console.log(data);

      // if username is not unique
      if (data.errors[0].validatorKey === "not_unique") {
        // display error to user
        const errorMsg = document.createElement('p');
        errorMsg.className = 'error';
        errorMsg.textContent = 'Username already taken.';
        document.querySelector('#login-signup h2').insertAdjacentElement('afterend', errorMsg);

        // if password not long enough
      } else if (data.errors[0].validatorKey === "len") {
        const errorMsg = document.createElement('p');
        errorMsg.className = 'error';
        errorMsg.textContent = 'Password must be at least 8 characters.';
        document.querySelector('#login-signup h2').insertAdjacentElement('afterend', errorMsg);
      }
    }
  }
}

document.querySelector('#login-signup').addEventListener('submit', signupHandler);