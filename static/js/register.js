$(() => {
  $('#registerBtn').click(() => {
    const username = $('#username').val();
    const password = $('#password').val();
    const repassword = $('#repassword').val();
    const role = $('#rolesSelect').val();
    if (!username || !password) {
      alert('Username and password cannot be empty');
    } else if (password != repassword) {
      alert('Password mismatch!');
    } else if (role != 'user' && role != 'student') {
      alert('Please select your role');
    } else {
      $.ajax({
        url: '/auth/register',
        method: 'POST',
        data: { username, password, role },
        error: (err) => {
          if (!err.responseJSON) {
            alert('Unknown Error');
          } else {
            alert(err.responseJSON.message);
          }
        },
        success: (data) => {
          alert(`Welcome, ${username}!\nYou can login with your account now!`);
          window.location.href = '/index.html';
        },
      });
    }
  });
});
