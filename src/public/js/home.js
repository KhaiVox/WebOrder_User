let productItems = document.querySelectorAll('.btn-add-cart')
// let productImages = document.querySelectorAll('.home-product-item__img')
// let productNames = document.querySelectorAll('.home-product-item__name')
let productIds = document.querySelectorAll('.product-id')
let productPrices = document.querySelectorAll('.price-number')

for (let i = 0; i < productItems.length; i++) {
    productItems[i].addEventListener('click', function () {
        // let imgValue = productImages[i].src
        // let nameValue = productNames[i].innerText
        let priceValue = productPrices[i].innerText
        let idValue = productIds[i].value
        // let numberValue = 1
        // let totalValue = productPrice[i].innerText
        // arr.push({ imgValue, nameValue, priceValue, numberValue, totalValue })

        // console.log(imgValue, nameValue, priceValue)
        console.log(idValue, priceValue)
    })
}
