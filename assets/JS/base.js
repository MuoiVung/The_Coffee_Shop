/**
 * Đây là file js dùng chung cho các trang.
 */
/////////////////////////
// Global variables
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const header = $('.header');
const btnUser = $('.nav__btn--user');
const modal = $('.modal');
const modalClose = $('.modal__close');
const modalOverlay = $('.modal__overlay');
const modalContent = $('.modal__content');
const body = $('body');
const modalMains = $$('.modal__main');
const btnLogin = $('.modal__btn--login');

const modalAccount = $('.modal--account');
const modalLogin = $('.modal--login');
const modalRegister = $('.modal--register');
const modalError = $('.modal__error');
const modalInputs = $$('.modal__input');

let foundAccount;

let accounts = [];
//////////////////////////
// classes
class Account {
    cart = [];
    isLogging = false;

    constructor(email, password, name) {
        this.email = email;
        this.password = password;
        this.name = name;
    }
}

//////////////////////////
// Local Storage
const setLocalStorage = function () {
    localStorage.setItem('accounts', JSON.stringify(accounts));
};

const getLocalStorage = function () {
    accounts = JSON.parse(localStorage.getItem('accounts'));
    if (!accounts) accounts = [];
};


//////////////////////////
// Tính scrollbar width
document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.offsetWidth) + 'px');

//////////////////////////
// Làm header sticky khi bắt đầu lăn con trỏ chuột
window.addEventListener('scroll', function () {
    if (window.scrollY !== 0) {
        header.classList.add('sticky');
    }
    else {
        header.classList.remove('sticky');
    }
});

//////////////////////////
// Hiển thị modal đăng nhập khi ấn nút user
// Reset modal login
const resetModal = function () {
    modalError.innerHTML = '';
    modalInputs.forEach(modalInput => modalInput.value = '');
};

const showModalError = function (error) {
    modalError.innerHTML = error;
};

const closeModal = () => {
    resetModal();
    modal.classList.add('modal__closing');
    body.classList.remove('open-modal');

    modalContent.addEventListener('animationend', () => {
        modal.classList.remove('modal__closing');
        modal.classList.remove('modal__active');
        header.style.transition = 'all 0.5s';
    }, { once: true });
};

btnUser.addEventListener('click', (e) => {
    resetModal();
    e.preventDefault();
    body.classList.add('open-modal');
    modal.classList.add('modal__active');
    header.style.transition = 'initial';
    setCurrentAccount();
});

modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', closeModal);

//////////////////////////
// chức năng login, logout, register

// hiển thị modal account
const renderAccount = function (foundAccount) {
    const html = `
                    <div class="modal__icon">
                        <img src="./assets/img/login-icon.png" alt="">
                    </div>
                    <h3 class="modal__header">Chào mừng</h3>
                    <p class="modal__account-name">${foundAccount.name},</p>
                    <ul class="modal__list">
                        <li class="modal__item">
                            <a href="#" class="modal__link">
                                <i class="modal__item-icon fa-solid fa-user"></i>
                                Thông tin tài khoản
                            </a>
                        </li>

                        <li class="modal__item">
                            <a href="#" class="modal__link">
                                <i class="modal__item-icon fa-solid fa-cart-shopping"></i>
                                Giỏ hàng
                            </a>
                        </li>

                        <li class="modal__item">
                            <a href="#" class="modal__link">
                                <i class="modal__item-icon fa-solid fa-gear"></i>
                                Cài đặt
                            </a>
                        </li>
                    </ul>
                    <button class="modal__btn modal__btn--logout">Đăng xuất</button>
    `;

    modalAccount.innerHTML = html;
    foundAccount.isLogging = true;
};

// Hiển thị modal main tương ứng
const renderModalMain = function (modalActive) {
    modalMains.forEach(modalMain => {
        modalMain.classList.remove('modal__main--active');
    });

    modalActive.classList.add('modal__main--active');
};

// xử lý login
const loginHandler = function (modalBtn) {
    const email = modalLogin.querySelector('.modal__input[type = "email"]').value;
    const password = modalLogin.querySelector('.modal__input[type = "password"]').value;

    accounts.forEach(account => {
        if (email === account.email && password === account.password) {
            foundAccount = account;
        }
    });

    if (!foundAccount) {
        showModalError('Tài khoản không tồn tại!');
        return;
    }

    renderModalMain(modalAccount);

    renderAccount(foundAccount);

    // xóa dữ liệu ở input sau khi đăng nhập thành công
    resetModal();

    setLocalStorage();

};

// xử lý logout
const logoutHandler = function () {
    renderModalMain(modalLogin);
    foundAccount.isLogging = false;
    foundAccount = undefined;
    setLocalStorage();
};

// xử lý register
const registerHandler = function () {
    const name = modalRegister.querySelector('.modal__input[type = "text"]').value;
    const email = modalRegister.querySelector('.modal__input[type = "email"]').value;
    const modalPasswords = modalRegister.querySelectorAll('.modal__input[type = "password"]');
    const validateEmail = (email) =>
        email.toLowerCase()
            .match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

    if (!name.trim()) {
        showModalError('Vui lòng nhập tên của bạn!');
        return;
    }

    if (!validateEmail(email)) {
        showModalError('Email nhập vào không hợp lệ!');
        return;
    }

    for (acc of accounts) {
        if (acc.email === email) {
            showModalError('Email này đã tồn tại!');
            return;
        }
    }

    if (!modalPasswords[0].value) {
        showModalError('Vui lòng nhập mật khẩu');
        return;
    }

    if (modalPasswords[0].value !== modalPasswords[1].value) {
        showModalError('Mật khẩu nhập lại không trùng khớp!');
        return;
    }

    const newAccount = new Account(email, modalPasswords[0].value, name.trim());
    accounts.push(newAccount);

    //Lưu tài khoản mới
    renderAccount(newAccount);
    setLocalStorage();

    resetModal();
    renderModalMain(modalAccount);

};

// xử lý event trong modal content
modalContent.addEventListener('click', function (e) {
    e.preventDefault();
    if (!e.target.classList.contains('modal__btn') &&
        !e.target.classList.contains('modal__btn-link')) return;
    const modalBtn = e.target;

    //Ẩn modal login, hiển thị modal register
    // khi ấn nút đăng ký trong modal login và ngược lại
    if (modalBtn.classList.contains('modal__btn-link--register')) {
        renderModalMain(modalRegister);
    }

    if (modalBtn.classList.contains('modal__btn-link--login')) {
        renderModalMain(modalLogin);
    }

    // Thực hiện đăng nhập
    if (modalBtn.classList.contains('modal__btn--login')) {
        loginHandler(modalBtn);
    }

    // Thực hiện đăng xuất
    if (modalBtn.classList.contains('modal__btn--logout')) {
        logoutHandler();
    }

    // Thực hiện đăng ký
    if (modalBtn.classList.contains('modal__btn--register')) {
        registerHandler();
    }
});

const setCurrentAccount = function () {
    for (acc of accounts) {
        if (acc.isLogging) {
            foundAccount = acc;
            renderModalMain(modalAccount);
            renderAccount(foundAccount);
            return;
        }
    }

    renderModalMain(modalLogin);
};

const init = function () {
    resetModal();
    getLocalStorage();
    setCurrentAccount();
};

init();