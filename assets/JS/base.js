/**
 * Đây là file js dùng chung cho các trang.
 */
/////////////////////////
// Global variables
const header = document.querySelector('.header');

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
