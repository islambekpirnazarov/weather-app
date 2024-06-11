// Global variables
const KEY = '08624edf74b80644f948d20cb299bf86'
const formSearch = document.querySelector('form')
const baseInformacion = document.querySelector('#base-informacion')
const weatherIcon = document.querySelector('#weather-icon')
const conditions = document.querySelector('#conditions')
const foreCast = document.querySelector('#fore-cast')
const forecastFiveDay = document.querySelector('#forecastFiveDay')
const sunrise = document.querySelector('#sunrise')
const sunset = document.querySelector('#sunset')
const errorMessage = document.querySelector('#error-message')

// Request Weather

async function getWeather(city) {
    const base = `https://api.openweathermap.org/data/2.5/weather`
    const query = `?q=${city}&units=metric&appid=${KEY}`
    const request = await fetch(base + query)
    if (!request.ok) {
        throw new Error(`Data fetched error status  : ${request.status}`)
    }
    const data = await request.json()
    return data;
}
getWeather('nukus')
    .then(data => renderWeather(data))
    .catch(err => {
        errorMessage.textContent = 'Aniqlanbagan magliwmat'
        errorMessage.classList.remove('hidden')
        setTimeout(() => {
            errorMessage.classList.add('hidden')
        }, 2000)
    })

// Request ForeCast
async function getForeCast(city) {
    const base = `https://api.openweathermap.org/data/2.5/forecast`
    const query = `?q=${city}&units=metric&appid=${KEY}`
    const request = await fetch(base + query)

    const data = await request.json()
    return data
}
getForeCast('nukus')
    .then(data => renderForeCast(data))
    .catch(err => {
        errorMessage.textContent = 'Aniqlanbagan magliwmat'
        errorMessage.classList.remove('hidden')
        setTimeout(() => {
            errorMessage.classList.add('hidden')
        }, 2000)
    })



// Render Weather

function renderWeather(weather) {
    baseInformacion.innerHTML = ''
    baseInformacion.innerHTML = `
        <div class="pl-5">
            <h2 class="text-[30px] sm:text-[40px] font-[700]">${weather.name}</h2>
            <span class="text-[gray]">Country: ${weather.sys.country}</span>
            <h1 class="text-[40px] sm:text-[60px] font-[800] mt-5">${Math.round(weather.main.temp)} &deg</h1>
            <span class="text-[15px]"> ${Math.round(weather.main.temp_max)} &deg / ${Math.round(weather.main.temp_min)} &deg </span>
        </div>
        <div class="">
            <img src="${getIcon(weather.weather[0].icon)}" alt="images" id="weather-icon" class="w-[300px]">
        </div>
    `

    let sunriseDate = new Date(weather.sys.sunrise * 1000)
    sunriseDate = `${sunriseDate.getHours()}:${sunriseDate.getMinutes()}`

    let sunsetDate = new Date(weather.sys.sunset * 1000)
    sunsetDate = `${sunsetDate.getHours()}:${sunsetDate.getMinutes()}`

    sunrise.textContent = sunriseDate
    sunset.textContent = sunsetDate
    conditions.innerHTML = `
        <div>
            <p class="flex items-center gap-2">
                <i class='bx bxs-thermometer text-[25px]'></i>
                Real feel
            </p>
            <h3 class="text-white text-[24px] md:text-[30px] font-[700] pl-5">${Math.round(weather.main.feels_like)}</h3>
        </div>
        <div>
            <p class="flex items-center gap-2">
                <i class='bx bx-wind text-[25px]'></i>
                Wind
            </p>
            <h3 class="text-white text-[24px] md:text-[30px] font-[700] pl-5">${Math.round(weather.wind.speed * 3.6)} km/h</h3>
        </div>
        <div>
            <p class="flex items-center gap-2">
                <i class='bx bx-droplet text-[25px]'></i>
                Humidity
            </p>
            <h3 class="text-white text-[24px] md:text-[30px] font-[700] pl-5">${weather.main.humidity} %</h3>
        </div>
        <div>
            <p class="flex items-center gap-2">
                <i class='bx bx-compass text-[25px]'></i>
                Pressure
            </p>
            <h3 class="text-white text-[24px] md:text-[30px] font-[700] pl-5">${weather.main.pressure} hPa</h3>
        </div>
    `
}

function getIcon(iconData) {
    let icon
    switch (iconData) {
        case "04d":
            icon = "./images/cloud-5.png"
            break;
        case "04d":
            icon = "./images/cloud-5.png"
            break;
        case "04n":
            icon = "./images/cloud-5.png"
            break;
        case "03d":
            icon = "./images/cloud-17.png"
            break;
        case "03n":
            icon = "./images/cloud-5.png"
            break;
        case "11d":
            icon = "./images/cloud-f-6.png"
            break;
        case "11n":
            icon = "./images/cloud-f-rain-7.png"
            break;
        case "10n":
            icon = "./images/cloud-rain-9.png"
            break;
        case "9n":
            icon = "./images/cloud-f-rain-7.png"
            break;
        case "01d":
            icon = "./images/sun-2.png"
            break;
        case "10d":
            icon = "./images/sun-rain-16.png"
            break;
        case "9d":
            icon = "./images/sun-rain-16.png"
            break;
        case "01n":
            icon = "./images/moon-11.png"
            break;
        case "02n":
            icon = "./images/moon-star-4.png"
            break;
        case "02d":
            icon = "./images/cloud-sun-10.png"
            break;
        case "13d":
            icon = "./images/cloud-wind-8.png"
            break;
        case "13n":
            icon = "./images/cloud-wind-13.png"
            break;
        case "50d":
            icon = "./images/cloud-wind-13.png"
            break;

    }
    return icon
}

// Render ForeCast 
function renderForeCast(foreCastApi) {
    foreCast.innerHTML = ''
    for (let i = 0; i <= 5; i++) {
        foreCast.innerHTML += `
                <div class="text-center">
                    <h5>${foreCastApi.list[i + 1].dt_txt.slice(11, 16)}</h5>
                    <img src="${getIcon(foreCastApi.list[i + 1].weather[0].icon)}" alt="" class="w-[70px] mx-auto my-4">
                    <h5 class="text-[22px] text-white">${Math.round(foreCastApi.list[i + 1].main.temp)}&deg</h5>
                </div>
            
        `
    }
    forecastFiveDay.innerHTML = ''
    foreCastApi.list.filter(item => {
        let day = new Date(item.dt_txt)
        day = day.getDay()
        if (item.dt_txt.slice(11, 16) == "12:00") {
            forecastFiveDay.innerHTML += `
            <li class="border-b-2 border-gray-600 text-[14px] sm:text-[16px] flex items-center justify-between py-5 gap-[10px] text-start">
                <div class="flex-1">${funcWeekDay(day)}</div>
                <div class="flex-1 flex items-center gap-2 text-white">
                    <img src="${getIcon(item.weather[0].icon)}"
                        alt="" class="w-[50px]">
                    ${item.weather[0].main}
                </div>
                <div class="flex-1 text-center"><span class="text-white">${Math.floor(item.main.temp)}&deg </div>
            </li>
            `
        }
    })
}

// Week Day function
const weekDay = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Sunday"]
function funcWeekDay(day) {
    switch (day) {
        case 1:
            day = weekDay[0]
            break;
        case 2:
            day = weekDay[1]
            break;
        case 3:
            day = weekDay[2]
            break;
        case 4:
            day = weekDay[3]
            break;
        case 5:
            day = weekDay[4]
            break;
        case 6:
            day = weekDay[5]
            break;
        case 7:
            day = weekDay[6]
            break;
    }
    return day;
}


// Form content
formSearch.addEventListener('submit', (e) => {
    e.preventDefault()
    const cityName = e.target.inputSearch.value.trim()
    if (cityName.length > 0) {
        getWeather(cityName).then(data => renderWeather(data))
        getForeCast(cityName).then(data => renderForeCast(data))
    } else {
        errorMessage.textContent = 'Qala atin jazin'
        errorMessage.classList.remove('hidden')
        setTimeout(() => {
            errorMessage.classList.add('hidden')
        }, 2000)
    }
    e.target.reset()
})
