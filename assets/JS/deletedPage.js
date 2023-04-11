// Elemets
const tableBody = document.getElementById('table-body');
const username = document.getElementById('user-name');
const phoneNo = document.getElementById('user-phone');
const userEmail = document.getElementById('user-email');
const modalForm = document.getElementById('modal-form');
const saveBtn = document.getElementById('save-modal');
const modalHeadertext = document.getElementById('modal-header-text');
const closeBtn = document.getElementById('x-btn-close');
const logoutBtn = document.getElementById('logout-btn');
const contactsBtn = document.getElementById('contact-btn');
const account = document.getElementById('account');
const remove_contacts = document.getElementById('remove-contacts-btn');
let editBtns, deleteBtns;
const logged = localStorage.getItem('loggedUser');

let contacts = JSON.parse(localStorage.getItem('deleted'));
let restored = JSON.parse(localStorage.getItem('users'));

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

remove_contacts.addEventListener('click', () => {
    localStorage.setItem('deleted', null);
    contacts = [{ name: 'null', phone: 'null', email: 'null' }];
    renderContacts();
});

const createNewRow = (id, name, phone, email) => {
    let newRow = `
    <tr>
        <td class="id">${id}</td>
        <td class="name"> ${name}</td>
        <td class="phone">${phone}</td>
        <td class="email">${email}</td>
        <td>
        <button class="btn btn-danger restore-btn">
            <i class="">
            <img class="contactIcons" src="icon/trash-bin.png">
            </i>
        </button>
        </td>
    </tr>`;
    return newRow;
};

const deleteData = (e) => {
    const state = confirm('are you sure?');
    if (state) {
        let name = e.target.closest('tr').children[1].innerText;
        let email = e.target.closest('tr').children[3].innerText;
        contacts.map((user, i) => {
            if (user.email == email && user.name == name) {
                restored.push(contacts[i]);
                contacts.splice(i, 1);
            }
        });
        renderContacts();
    }
};
// eventListners
const addEventListeners = () => {
    deleteBtns.forEach((deleteBtn) => {
        deleteBtn.addEventListener('click', deleteData);
    });
};

//update the selectors and localstorage
const update = () => {
    editBtns = document.querySelectorAll('.edit-btn');
    deleteBtns = document.querySelectorAll('.restore-btn');
    addEventListeners();
    localStorage.setItem('deleted', JSON.stringify(contacts));
    localStorage.setItem('users', JSON.stringify(restored));
};

// render the users
const renderContacts = () => {
    tableBody.innerHTML = '';
    contacts.map((contact, i) => {
        tableBody.insertAdjacentHTML(
            'beforeend', createNewRow(i + 1, contact.name, contact.phone, contact.email),
        );
    });
    update();
};

window.addEventListener('DOMContentLoaded', init());


const updateContactInfo = (name, phone, email) => {
    modalForm.reset;
    username.value = name;
    phoneNo.value = phone;
    userEmail.value = email;
};