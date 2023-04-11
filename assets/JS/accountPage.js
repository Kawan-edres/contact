// Elemets
const logoutBtn = document.getElementById('logout-btn');
const contactsBtn = document.getElementById('contact-btn');
const deletedBtn = document.getElementById('deleted-btn');
const account = document.getElementById('account');

localStorage.setItem('email', JSON.stringify(document.getElementById('email')));
localStorage.setItem('password', JSON.stringify(document.getElementById('password')));

const init = () => {
    if (!logged) {
        location.assign('./index.html');
    }
    renderContacts();
};

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('loggedUser');
    location.assign('./index.html');
});

contactsBtn.addEventListener('click', () => {
    location.assign('./contact.html');
});

account.addEventListener('click', () => {
    location.assign('./account.html');
});

function deleted_page() {
    location.assign('./deleted.html');
}




