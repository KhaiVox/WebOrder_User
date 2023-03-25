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

// Khi giỏ hàng không có sản phẩm sẽ ẩn đi những button, title mô tả

const notifyCartEmpty = document.querySelector('.notify-cart')
const desHeader = document.querySelector('.cart-heading')
const desFooter = document.querySelector('.cart-footer')
const btnViewCart = document.querySelector('.header__cart-item-view-cart')

if (notifyCartEmpty.innerText == 'Chưa có sản phẩm.') {
    desHeader.classList.add('hidden')
    desFooter.classList.add('hidden')
}
