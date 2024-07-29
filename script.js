const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const longitudeOutput = document.querySelector('.longitude');
const latitudeOutput = document.querySelector('.latitude');
const coordinatesOutput = document.querySelector('.coordinates');
const countryOutput = document.querySelector('.country');
const pressureOutput = document.querySelector('.pressure');
const visibilityOutput = document.querySelector('.visibility');
const feelsLikeOutput = document.querySelector('.feels-like');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

// Default city
let cityInput = "Hyderabad";

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerText;
        fetchWeatherData();
        app.style.opacity = "0";
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (search.value.length > 0) {
        cityInput = search.value;
        fetchWeatherData();
        search.value = "";
    } else {
        fetchWeatherData(); // Fetch weather for current location if no city is provided
    }
    app.style.opacity = "0";
});

document.getElementById('location-btn').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                cityInput = `${lat},${lon}`;
                fetchWeatherData();
            },
            () => {
                alert("Unable to retrieve your location");
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

function dayOfTheWeek(day, month, year) {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    return weekday[new Date(`${year}-${month}-${day}`).getDay()];
}

function fetchWeatherData() {
    const api_key = '[Your API key Here]';

    fetch(`https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${cityInput}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        temp.innerHTML = data.current.temp_c + "&#176";
        conditionOutput.innerHTML = data.current.condition.text;

        const date = data.location.localtime;
        const y = parseInt(date.substr(0, 4));
        const m = parseInt(date.substr(5, 2));
        const d = parseInt(date.substr(8, 2));
        const time = date.substr(11);

        dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
        timeOutput.innerHTML = time;

        nameOutput.innerHTML = data.location.name;
        longitudeOutput.innerHTML = data.location.lon;
        latitudeOutput.innerHTML = data.location.lat;
        coordinatesOutput.innerHTML = `<h4>Spatial Information</h4>
                <li>
                    <span>Latitude: </span>
                    <span class="latitude">${data.location.lat}</span>
                </li>
                <li>
                    <span>Longitude: </span>
                    <span class="longitude">${data.location.lon}</span>
                </li>
                <li>
                    <span>Coordinates: </span>
                    <span class="coordinates">${data.location.lat}, ${data.location.lon}</span>
                </li>
                <li>
                    <span>Country: </span>
                    <span class="country">${data.location.country}</span>
                </li>`;
        countryOutput.innerHTML = data.location.country;
        pressureOutput.innerHTML = data.current.pressure_mb + " hPa";
        visibilityOutput.innerHTML = data.current.vis_km + " km";
        feelsLikeOutput.innerHTML = data.current.feelslike_c + "&#176C";

        const iconId = data.current.condition.icon.substr(
            "//cdn.weatherapi.com/weather/64x64/".length
        );

        //icon.src = "//cdn.weatherapi.com/weather/64x64/" + iconId;
        icon.src = "./icons/" + iconId;

        cloudOutput.innerHTML = data.current.cloud + "%";
        humidityOutput.innerHTML = data.current.humidity + "%";
        windOutput.innerHTML = data.current.wind_kph + " km/h";

        let timeOfDay = "day";
        const code = data.current.condition.code;

        if (!data.current.is_day) {
            timeOfDay = "night";
        }

        if (code === 1000) {
            app.style.backgroundImage = `url(./assets/${timeOfDay}/clear.jpg)`;
            btn.style.background = timeOfDay === "night" ? "#181e27" : "#e5ba92";
        } else if (
            code === 1003 ||
            code === 1006 ||
            code === 1009 ||
            code === 1030 ||
            code === 1069 ||
            code === 1087 ||
            code === 1135 ||
            code === 1273 ||
            code === 1276 ||
            code === 1279 ||
            code === 1282
        ) {
            app.style.backgroundImage = `url(./assets/${timeOfDay}/cloudy.jpg)`;
            btn.style.background = timeOfDay === "night" ? "#181e27" : "#fa6d1b";
        } else if (
            code === 1063 ||
            code === 1069 ||
            code === 1072 ||
            code === 1150 ||
            code === 1153 ||
            code === 1180 ||
            code === 1183 ||
            code === 1186 ||
            code === 1189 ||
            code === 1192 ||
            code === 1195 ||
            code === 1204 ||
            code === 1207 ||
            code === 1240 ||
            code === 1243 ||
            code === 1246 ||
            code === 1249 ||
            code === 1252
        ) {
            app.style.backgroundImage = `url(./assets/${timeOfDay}/rainy.jpg)`;
            btn.style.background = timeOfDay === "night" ? "#325c80" : "#647d75";
        } else {
            app.style.backgroundImage = `url(./assets/${timeOfDay}/snowy.jpg)`;
            btn.style.background = timeOfDay === "night" ? "#1b1b1b" : "#4d72aa";
        }

        app.style.opacity = "1";
    })
    .catch(() => {
        alert('City not found');
        app.style.opacity = "1";
    });
}

fetchWeatherData();
app.style.opacity = "1";
