function locate() {
    const btnAddress = document.querySelector('.btn-address')
    const userAddress = document.querySelector('#address')
    const latitude = document.querySelector('#latitude')
    const longitude = document.querySelector('#longitude')

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude
            const long = position.coords.longitude

            // btnAddress.setAttribute('hidden', 'hidden')
            userAddress.value = `${lat} ${long}`
            latitude.value = lat
            longitude.value = long
        })
    }
}
