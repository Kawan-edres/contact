// Elemets
const tableBody = document.getElementById('table-body');
const username = document.getElementById('user-name');
const phoneNo = document.getElementById('user-phone');
const userEmail = document.getElementById('user-email');
const modalForm = document.getElementById('modal-form');
const saveBtn = document.getElementById('save-modal');
const addUserBtn = document.getElementById('add-contact-btn');
const modalHeadertext = document.getElementById('modal-header-text');
const closeBtn = document.getElementById('x-btn-close');
const logoutBtn = document.getElementById('logout-btn');
const accountBtn = document.getElementById('account');
const deletedBtn = document.getElementById('deleted-btn');
let editBtns, deleteBtns;
const logged = localStorage.getItem('loggedUser');

const init = () => {
    if (!logged) {
        location.assign('./index.html');
    }
    renderContacts();
};

// renderContacts();

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('loggedUser');
    location.assign('./index.html');
});

accountBtn.addEventListener('click', () => {
    location.assign('./account.html');
});

deletedBtn.addEventListener('click', () => {
    location.assign('./deleted.html');
});

// users
let contacts = JSON.parse(localStorage.getItem('users')) || [{ name: 'null', phone: 'null', email: 'null' }];
let deleted = JSON.parse(localStorage.getItem('deleted')) || [{ name: 'null', phone: 'null', email: 'null' }];

const createNewRow = (id, name, phone, email) => {
    let newRow = `
    <tr>
        <td class="id">${id}</td>
        <td class="name"> ${name}</td>
        <td class="phone">${phone}</td>
        <td class="email">${email}</td>
        <td>
            <button
                type="button"
                id="${id}"
                class="btn btn-primary edit-btn"
                data-bs-toggle="modal"
                data-bs-target="#modal3"
            >
            <img class="contactIcons" src="icon/pen-tool.png">
            <i class=""></i>
        </button>

        <button class="btn btn-danger delete-btn ">
            <i class="">
            <img class="contactIcons" src="icon/trash-bin.png">
            </i>
        </button>
        </td>
    </tr>`;
    return newRow;
};
// addContact
const addContact = () => {
    contacts.push({
        name: username.value,
        phone: phoneNo.value,
        email: userEmail.value,
    });
};
// edit data
const editContact = (e) => {
    let currentRow = e.target.parentElement.parentElement.children;
    if (!currentRow.innerText) {
        currentRow = e.target.parentElement.parentElement.parentElement.children;
    }
    let name = currentRow[1].innerText;
    let phone = currentRow[2].innerText;
    let email = currentRow[3].innerText;
    updateContactInfo(name, phone, email);

    contacts.map((contact) => {
        if (contact.name == name) {
            modalForm.onsubmit = (e) => {
                e.preventDefault();
                contact.name = username.value;
                contact.phone = phoneNo.value;
                contact.email = userEmail.value;
                renderContacts();
                closeBtn.click();
            };
        }
    });
};
const deleteData = (e) => {
    const state = confirm('are you sure?');
    if (state) {
        let name = e.target.closest('tr').children[1].innerText;
        let email = e.target.closest('tr').children[3].innerText;
        contacts.map((user, i) => {
            if (user.email == email && user.name == name) {
                deleted.push(contacts[i]);
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
    editBtns.forEach((editBtn) => {
        editBtn.addEventListener('click', editContact);
    });
    addUserBtn.addEventListener('click', () => {
        modalHeadertext.innerText = 'Add User';
        phoneNo.value = '';
        userEmail.value = '';
        username.value = '';
        modalForm.onsubmit = (e) => {
            e.preventDefault();
            modalForm.reset;
            addContact();
            renderContacts();
            closeBtn.click();
        };
    });
};

//update the selectors and localstorage
const update = () => {
    editBtns = document.querySelectorAll('.edit-btn');
    deleteBtns = document.querySelectorAll('.delete-btn');
    addEventListeners();
    localStorage.setItem('users', JSON.stringify(contacts));
    localStorage.setItem('deleted', JSON.stringify(deleted));
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
// renderUsers
// load data from local storage or default data
window.addEventListener('DOMContentLoaded', init());
// update modal
const updateContactInfo = (name, phone, email) => {
    modalForm.reset;
    username.value = name;
    phoneNo.value = phone;
    userEmail.value = email;
};