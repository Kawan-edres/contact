const loginForm = document.getElementById('login-form');
const entered_email = document.getElementById('email');
const entered_password = document.getElementById('password');

const init = () => {
  const logged = localStorage.getItem('loggedUser');
  logged ? location.assign('contact.html') : '';
};

// loginForm.addEventListener('submit', () => {
//   console.log(entered_email + ' || ' + entered_password);
//   if (entered_email.value === JSON.parse(localStorage.getItem('email')) && entered_password.value === JSON.parse(localStorage('password'))) {
//     localStorage.setItem('loggedUser', "you're logged in, mate.");
//     location.assign('contact.html');
//   }
// });

loginForm.addEventListener('submit', () => {
  console.log(entered_email + ' || ' + entered_password);
  if (entered_email.value === 'someone@mail.com' && entered_password.value === 'someone123') {
    localStorage.setItem('loggedUser', "you're logged in, mate.");
    location.assign('contact.html');
  }
});

window.addEventListener('DOMContentLoaded', init());
