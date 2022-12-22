var search = document.querySelector('.search')
var city = document.querySelector('.city')
var time = document.querySelector('.time')
var country = document.querySelector('.country')
var temperatureValue = document.querySelector('.temperature--value')
var shortDesc = document.querySelector('.short-desc')
var visibility = document.querySelector('.visibility span')
var wind = document.querySelector('.wind span')
var sun = document.querySelector('.sun span')
var content = document.querySelector('.content')
var body = document.querySelector('body')



async function changeWeatherUI(capitalSearch) {
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${capitalSearch}&appid=a06b1c3019bed1160ca547dc5bd68d7c`
    // Hanoi is located at latitude 21.0245 and longitude 105.84117

    let data = await fetch(apiURL).then(res => res.json())
    console.log(data);

    if(data.cod == 200) {
        content.classList.remove('hide')
        city.innerText = data.name
        country.innerText = data.sys.country
        visibility.innerText = data.visibility + '(m)'
        wind.innerText = data.wind.speed + '(m/s)'
        sun.innerText = data.main.humidity + '(%)'

        let temp = Math.round(data.main.temp - 273.15) // đổi độ k --> độ c
        temperatureValue.innerText = temp + '℃'

        shortDesc.innerText = data.weather[0] ? data.weather[0].main : ''
        time.innerText = new Date().toLocaleString('vi')

        body.setAttribute('class', 'hot')
        if(temp <= 22) {
            body.setAttribute('class', 'cool')
        }
        if(temp <= 18) {
            body.setAttribute('class', 'cold')
        }
    }
    else {
        content.classList.add('hide')
    }
}
changeWeatherUI('Ha Noi')
search.addEventListener('keypress', function(e){
    if(e.code === 'Enter') {
        let capitalSearch = search.value.trim()
        changeWeatherUI(capitalSearch)
    }
})