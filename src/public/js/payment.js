console.log('payment.js')
function locate() {
    const userAddress = document.querySelector('#address')
    const latitude = document.querySelector('#latitude')
    const longitude = document.querySelector('#longitude')

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude
            const long = position.coords.longitude

            userAddress.value = `${lat} ${long}`
            latitude.value = lat
            longitude.value = long
        })
    }
}
