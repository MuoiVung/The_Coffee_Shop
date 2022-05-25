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
