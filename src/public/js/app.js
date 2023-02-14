// Fade
AOS.init()

// Click xóa nội dung trong ô search
var btnDelete = document.querySelectorAll('.search-delete')
var inputSearch = document.querySelector('.search-input')

btnDelete.forEach(
    (item) =>
    (item.onclick = function() {
        inputSearch.value = ''
    }),
)

// Change Mode Dark/Light
let switchInput = document.querySelector('.switch-input')
let iconLight = document.querySelector('.mode-icon-dark')
let iconDark = document.querySelector('.mode-icon-light')
let sideBar = document.querySelector('.sidebar')

if (localStorage.getItem('handleMode') === 'true') {
    // đang sáng
    sideBar.classList.add('active-mode')
    iconLight.classList.remove('hidden')
    iconDark.classList.add('hidden')
    switchInput.classList.add('active')
} else {
    // đang tối
    sideBar.classList.remove('active-mode')
    iconLight.classList.add('hidden')
    iconDark.classList.remove('hidden')
    switchInput.classList.remove('active')
}

function handleChangeMode() {
    // khi đang tối (tức là không có class active-mode)
    if (!sideBar.classList.contains('active-mode')) {
        // code chuyển thành sáng
        switchInput.classList.add('active')
        iconLight.classList.toggle('hidden')
        iconDark.classList.toggle('hidden')
        sideBar.classList.add('active-mode')

        localStorage.setItem('handleMode', 'true')
    } else {
        // code chuyển thành tối
        switchInput.classList.remove('active')
        iconLight.classList.toggle('hidden')
        iconDark.classList.toggle('hidden')
        sideBar.classList.remove('active-mode')

        localStorage.setItem('handleMode', 'false')
    }
}

// Clock
setInterval(function() {
    const clock = document.querySelector('.display')
    let time = new Date()
    let sec = time.getSeconds()
    let min = time.getMinutes()
    let hr = time.getHours()
    let day = 'AM'
    if (hr > 12) {
        day = 'PM'
        hr = hr - 12
    }
    if (hr == 0) {
        hr = 12
    }
    if (sec < 10) {
        sec = '0' + sec
    }
    if (min < 10) {
        min = '0' + min
    }
    if (hr < 10) {
        hr = '0' + hr
    }
    clock.textContent = hr + ':' + min + ':' + sec + ' ' + day
})