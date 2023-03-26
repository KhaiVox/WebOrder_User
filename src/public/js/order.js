// Hiển thị thông báo khi không có đơn đặt nào
const titleOrder = document.querySelector('.notify-cart')
const orderDes = document.querySelector('.payment-body')
const orderProcess = document.querySelector('.process-order')

if (titleOrder.innerHTML == 'Bạn chưa đặt đơn hàng nào.') {
    orderDes.classList.add('hidden')
    orderProcess.classList.add('hidden')
}
