// Show Hide Password
var passInput = document.querySelector('.input-password')

function showHidePassword() {
    passInput.type = passInput.type === 'password' ? 'text' : 'password'
}

// Set Cookie
function setCookie(cname, cvalue, exdays) {
    const d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    let expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

// Get Cookie
function getCookie(cname) {
    let name = cname + '='
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(';')
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) == ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ''
}

// Login
function handleLogin() {
    const form = document.querySelector('.form-action-login')
    const username = document.querySelector('#username').value
    const password = document.querySelector('#password').value

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        fetch('/user/login', {
            method: 'POST',
            body: JSON.stringify({ username: username, password: password }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((data) => {
                return data.json()
            })
            .then((data) => {
                if (data.token) {
                    setCookie('token', data.token, 1)
                    window.location.href = '/home'
                } else {
                    const text = document.querySelector('.text')
                    text.classList.remove('hidden')
                }
            })
            .catch((e) => console.log(e.message))
    })
}

// function login() {
//     $.ajax({
//         url: '/user/login',
//         method: 'POST',
//         data: {
//             username: $('#username').val(),
//             password: $('#password').val(),
//         },
//     }).then((data) => {
//         setCookie('token', data.token, 1)
//         window.location.href = '/'
//     })
// }

// Nhận sự kiện từ việc nhấn phím để thực hiện function handleLogin()
document.onkeypress = function (myEvent) {
    // console.log(myEvent.which);
    if (myEvent.which == 13) {
        handleLogin()
    }
}
