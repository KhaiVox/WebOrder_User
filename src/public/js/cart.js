// Khi giỏ hàng không có sản phẩm sẽ ẩn đi những button, title mô tả
const notifyCartEmpty = document.querySelector('.notify-cart')
const desHeader = document.querySelector('.cart-heading')
const desFooter = document.querySelector('.cart-footer')
const btnViewCart = document.querySelector('.header__cart-item-view-cart')

// if (notifyCartEmpty.innerText == 'Chưa có sản phẩm.') {
//     desHeader.classList.add('hidden')
//     desFooter.classList.add('hidden')
// }

// function updatePrice(input) {
//     let value = input.value
//     let valueIndex = input.getAttribute('data-id')
//     // let priceItem = document.getElementsByClassName('item-price')[valueIndex].value
//     // let total = parseInt(priceItem) * parseInt(value)
//     // arr[valueIndex].numberValue = value
//     // arr[valueIndex].totalValue = total

//     // handleAdd()
//     // changeTotal()
//     // changeQuantity()

//     console.log(valueIndex)
// }

// // cập nhật tổng tiền
// function changeTotal() {
//     let count = 0
//     var numberTotal = document.querySelector('.number-total')
//     for (let i in arr) {
//         count += parseInt(arr[i].totalValue)
//     }
//     numberTotal.value = count
// }

// // cập nhật số lượng tổng ở thanh list heading
// function changeQuantity() {
//     let countQtt = 0
//     let quantity = document.querySelector('.quantity')
//     for (let i in arr) {
//         countQtt += parseInt(arr[i].numberValue)
//     }
//     quantity.innerText = countQtt
// }

// Ajax thêm giỏ hàng
const carts = document.querySelectorAll('.btn-add-cart')
const cartId = document.querySelectorAll('input[name=id_Food]')
const prices = document.querySelectorAll('input[name=price]')

const numberDesTotal = document.querySelector('.header__cart-notice')

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', async function () {
        await fetch('http://localhost:3002/cart/addCart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_Food: cartId[i].value, price: prices[i].value }),
        })
            .then(() => {
                // cập nhật số lượng sản phẩm trong giỏ hàng
                // để hiển thị lại trên giao diện header bằng ajax
                fetch('http://localhost:3002/cart/cartTotal', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                })
                    .then((response) => response.json())
                    .then((totalProductCart) => {
                        numberDesTotal.innerHTML = totalProductCart
                    })
            })
            .catch((error) => console.error(error))
    })
}

// Animation Add Cart
const cartBtn = document.querySelectorAll('.cart-button')

for (let i = 0; i <= cartBtn.length; i++) {
    cartBtn[i].addEventListener('click', () => {
        cartBtn[i].classList.add('clicked')

        setTimeout(() => {
            cartBtn[i].classList.remove('clicked')
        }, 2000)
    })
}
