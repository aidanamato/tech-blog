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

// logout after 10 minutes of inactivity
// reset timer on any user activity
window.onclick = resetTimeout;
window.onmousemove = resetTimeout;
window.onmousedown = resetTimeout;
window.onkeypress = resetTimeout;
window.onscroll = resetTimeout;

// function to reset timer
function resetTimeout() {
  clearTimeout(timeout);
  timeout = setTimeout(logoutHandler, 600000);
}

// initialize timer on page load
let timeout = setTimeout(logoutHandler, 600000);