// Click đổi màu item
let list = document.querySelectorAll('.nav-item')

function activeLink() {
    // sự kiện hover cho các nav-item khi ở chế độ tối
    if (localStorage.getItem('handleMode') === 'true') {
        list.forEach((item) => item.classList.remove('active-item'))

        this.classList.add('active-item')
    } else {
        list.forEach((item) => item.classList.remove('active-item'))
    }
}

list.forEach((item) => item.addEventListener('mouseover', activeLink))

// Click đóng mở sidebar
// gọi để set lại width cho content left
let sidebar = document.querySelector('.sidebar')

// gọi để set lại width cho content right
let contentRight = document.querySelector('.container-right')
let logoImage = document.querySelector('.logo-img')
let iconLeft = document.querySelector('.nav-icon-left')
let iconRight = document.querySelector('.nav-icon-right')
let copyright = document.querySelector('.copyright')

if (localStorage.getItem('handleSidebar') === 'true') {
    sidebar.classList.add('active')
    contentRight.classList.add('set-width')
    logoImage.classList.add('hidden')
    iconLeft.classList.add('hidden')
    iconRight.classList.remove('hidden')
    copyright.classList.add('hidden')
} else {
    sidebar.classList.remove('active')
    contentRight.classList.remove('set-width')
    logoImage.classList.remove('hidden')
    iconLeft.classList.remove('hidden')
    iconRight.classList.add('hidden')
    copyright.classList.remove('hidden')
}

function handleToggleSidebar() {
    // khi đang mở (tức là không có class active)
    if (!sideBar.classList.contains('active')) {
        // code để đóng
        sidebar.classList.add('active')
        contentRight.classList.add('set-width')
        logoImage.classList.add('hidden')
        iconLeft.classList.add('hidden')
        iconRight.classList.remove('hidden')
        copyright.classList.add('hidden')

        localStorage.setItem('handleSidebar', 'true')
    } else {
        // code để mở
        sidebar.classList.remove('active')
        contentRight.classList.remove('set-width')
        logoImage.classList.remove('hidden')
        logoImage.classList.remove('hidden')
        iconLeft.classList.remove('hidden')
        iconRight.classList.add('hidden')
        copyright.classList.remove('hidden')

        localStorage.setItem('handleSidebar', 'false')
    }
}