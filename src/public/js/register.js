// Register
function handleRegister() {
    let form = document.querySelector('.form-action-register')
    let fullName = document.querySelector('#fullname-register').value
    let phone = document.querySelector('#pgone-register').value
    let address = document.querySelector('#address-register').value
    let username = document.querySelector('#username-register').value
    let password = document.querySelector('#pass-register').value
    let passwordRepeat = document.querySelector('#repeat-password').value
    const textNotifyUser = document.querySelector('.text-notify-user')

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        if (password === passwordRepeat) {
            fetch('/auth/register', {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password,
                    fullname: fullName,
                    address: address,
                    phone: phone,
                }),
                headers: { 'Content-Type': 'application/json' },
            })
                .then((data) => {
                    return data.json()
                })
                .then((data) => {
                    if (data == 'User này đã tồn tại!') {
                        textNotifyUser.classList.remove('hidden')
                    } else {
                        window.location.href = '/auth/login'
                    }
                })
                .catch((e) => console.log(e.message))
        } else {
            textNotify.classList.remove('hidden')
        }
    })
}
