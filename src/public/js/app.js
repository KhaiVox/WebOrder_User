// Click xóa nội dung trong ô search
// var btnDelete = document.querySelectorAll('.search-delete')
// var inputSearch = document.querySelector('.search-input')

// btnDelete.forEach(
//     (item) =>
//         (item.onclick = function () {
//             inputSearch.value = ''
//         }),
// )

// Scroll Top
// set vị trí ban đầu cho vị trí scroll
var lastScrollTop = 500
window.addEventListener('scroll', function() {
    var scroll = document.querySelector('.scroll-top')
    scroll.classList.toggle('active', window.scrollY > 800)

    // Ẩn hiện nav khi scroll
    var headerNav = document.querySelector('.header-nav')
    var currentScrollTop = $(this).scrollTop()

    if (currentScrollTop < lastScrollTop) {
        // nếu vị trí hiện tại bé hơn lúc trước -> trượt lên
        headerNav.classList.remove('hide')
    } else {
        // trượt xuống
        headerNav.classList.add('hide')
    }

    lastScrollTop = currentScrollTop
})

backToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })
}
