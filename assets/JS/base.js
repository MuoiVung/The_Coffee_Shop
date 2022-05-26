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

let foundAccount;

const account1 = {
    email: 'tonggiang@gmail.com',
    password: '123',
    name: 'Tống Giang',
};

const account2 = {
    email: 'lamxung@gmail.com',
    password: '345',
    name: 'Lâm Xung',
};

const accounts = [account1, account2];
//////////////////////////
// classes
class account {
    cart = [];

    constructor(email, password, name) {
        this.email = email;
        this.password = password;
        this.name = name;
    }
}

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
const closeModal = () => {
    modal.classList.add('modal__closing');
    body.classList.remove('open-modal');

    modalContent.addEventListener('animationend', () => {
        modal.classList.remove('modal__closing');
        modal.classList.remove('modal__active');
        header.style.transition = 'all 0.5s';
    }, { once: true });
};

btnUser.addEventListener('click', (e) => {
    e.preventDefault();
    body.classList.add('open-modal');
    modal.classList.add('modal__active');
    header.style.transition = 'inital';
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
};

// hiển thị modal register
const showModalRegister = function (modalBtn) {
    const isInModalLogin = modalBtn.closest('.modal--login');
    if (!isInModalLogin) return;
    modalLogin.classList.toggle('modal__main--active');
    modalRegister.classList.toggle('modal__main--active');
};

// xử lý login
const loginHandler = function (modalBtn) {
    const modalLogin = modalBtn.closest('.modal--login');
    const email = modalLogin.querySelector('.modal__input[type = "email"]').value;
    const password = modalLogin.querySelector('.modal__input[type = "password"]').value;


    accounts.forEach(account => {
        if (email === account.email && password === account.password) {
            foundAccount = account;
        }
    });

    if (!foundAccount) {
        console.log('Tài khoản không tồn tại!');
        return;
    }

    modalLogin.classList.toggle('modal__main--active');
    modalAccount.classList.toggle('modal__main--active');

    renderAccount(foundAccount);

    // xóa dữ liệu ở input sau khi đăng nhập thành công
    modalLogin.querySelector('.modal__input[type = "email"]').value = '';
    modalLogin.querySelector('.modal__input[type = "password"]').value = '';
};

// xử lý logout
const logoutHandler = function () {
    modalAccount.classList.toggle('modal__main--active');
    modalLogin.classList.toggle('modal__main--active');
};

// xử lý event trong modal content
modalContent.addEventListener('click', function (e) {
    e.preventDefault();
    if (!e.target.classList.contains('modal__btn')) return;
    const modalBtn = e.target;
    //Ẩn modal đăng nhập, hiển thị modal đăng ký
    // khi ấn nút đăng ký trong modal login
    if (modalBtn.classList.contains('modal__btn--register')) {
        showModalRegister(modalBtn);
    }

    // Thực hiện đăng nhập
    if (modalBtn.classList.contains('modal__btn--login')) {
        loginHandler(modalBtn);
    }

    // Thực hiện đăng xuất
    if (modalBtn.classList.contains('modal__btn--logout')) {
        logoutHandler();
    }
});

