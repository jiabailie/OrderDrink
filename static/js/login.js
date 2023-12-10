$(() => {
  $('#formSubmit').click(() => {
    const username = $('#username').val();
    const password = $('#password').val();
    if (!username || !password) {
      alert('Username and password cannot be empty');
    } else {
      $.ajax({
        url: '/auth/login',
        method: 'POST',
        data: { username, password },
        error: (err) => {
          if (!err.responseJSON) {
            alert('Unknown Error');
          } else {
            alert(err.responseJSON.message);
          }
        },
        success: (data) => {
          alert(`Logged as '${data.user.username}' (${data.user.role})`);
          window.location.href = '/index.html';
        },
      });
    }
  });

  $('#toRegister').click(() => {
    window.location.href = '/register.html';
  });
});
