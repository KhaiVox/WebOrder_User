// Register
function handleRegister() {
    const username = document.querySelector('#username-register').value
    const password = document.querySelector('#pass-register').value
    const passwordRepeat = document.querySelector('#repeat-pass-register').value
    const form = document.querySelector('.form-action-register')
    const textNotify = document.querySelector('.text-notify')
    const textNotifyUser = document.querySelector('.text-notify-user')

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        if (password === passwordRepeat) {
            fetch('/user/register', {
                    method: 'POST',
                    body: JSON.stringify({ username: username, password: password }),
                    headers: { 'Content-Type': 'application/json' },
                })
                .then((data) => {
                    return data.json()
                })
                .then((data) => {
                    if (data == 'User này đã tồn tại!') {
                        textNotifyUser.classList.remove('hidden')
                    } else {
                        window.location.href = '/'
                    }
                })
                .catch((e) => console.log(e.message))
        } else {
            textNotify.classList.remove('hidden')
        }
    })
}

// Nhận sự kiện từ việc nhấn phím để thực hiện function handleLogin()
document.onkeypress = function(myEvent) {
    if (myEvent.which == 13) {
        handleRegister()
    }
}

// Login Confirm Admin
function handleConfirm() {
    const username = document.querySelector('#user-admin').value
    const password = document.querySelector('#pass-admin').value
    const form = document.querySelector('.form-confirm')

    // form.addEventListener('submit', (e) => {
    //     e.preventDefault()
    //     const rest = fetch('/user/login', {
    //             method: 'POST',
    //             body: JSON.stringify({ username: username, password: password }),
    //             headers: { 'Content-Type': 'application/json' },
    //         })
    //         .then((data) => {
    //             return data.json()
    //         })
    //         .then((data) => {
    //             console.log(data)
    //         })
    //         .catch((e) => console.log(e.message))
    // })
}