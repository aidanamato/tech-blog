async function logoutHandler() {
  const response = await fetch('/api/users/logout', {
    method: 'POST'
  });
  
  if (response.ok) {
    console.log('success');
    location.reload();
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#logout').addEventListener('click', logoutHandler);