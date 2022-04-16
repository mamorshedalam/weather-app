/* ========== VARIABLES ASSIGN ========== */
const currentIcon = document.getElementById("condition-img")
const currentCity = document.getElementById("city")
const currentCountry = document.getElementById("country")
const currentCondition = document.getElementById("main")
const description = document.getElementById("description")
const currentTemp = document.getElementById("temp")
const currentPressure = document.getElementById("pressure")
const currentHumidity = document.getElementById("humidity")
const cityInput = document.getElementById("city-input")
const historyElement = document.getElementById("history-element")
const emptyHistory = document.getElementById("history")
const historyItem = document.getElementById("history-item")

/* ========== API ASSIGN ========== */
const API_KEY = 'f83bf937c2bd6f16b58874bd954379bd';
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;
const ICON_URL = `http://openweathermap.org/img/wn/`;
const DEFAULT_CITY = 'Chittagong, bd';
const DB_URL = '/history'

/* ========== EVEN LISTENER ========== */
window.onload = function () {

     // WEATHER DATA BY CURRENT LOCATION
     navigator.geolocation.getCurrentPosition(success => {
          getWeatherData(null, success.coords)
     }, error => {
          getWeatherData()
     })

     // GET API REQUEST FROM DATABASE FOR HISTORY
     axios.get(DB_URL)
          .then(({ data }) => {
               if (data.length > 0) {
                    updateHistory(data);
               } else { emptyHistory.innerText = "There is no history" }
          })
          .catch(err => {
               alert("Error Occurred")
          })

     // WEATHER DATA BY SEARCH
     cityInput.addEventListener('keypress', function (e) {
          if (e.key === 'Enter') {
               if (e.target.value) {
                    getWeatherData(e.target.value, null, weather => {
                         e.target.value = '';

                         // GET REQUEST WITH CURRENT HISTORY
                         axios.post(DB_URL, weather)
                              .then(({ data }) => {
                                   dataArray = [data]
                                   updateHistory(dataArray)
                              })
                              .catch(err => {
                                   alert("Error Occurred")
                              })
                    })
               } else {
                    alert('Please enter a Valid City Name')
               }
          }
     })
}

/* ========== FUNCTION ========== */

// GET WEATHER DATA BY API
function getWeatherData(city = DEFAULT_CITY, coords, callback) {
     let url = BASE_URL

     // DEFAULT CITY
     city === null ? url = `${url}&lat=${coords.latitude}&lon=${coords.longitude}` : url = `${url}&q=${city}&appid=${API_KEY}`;

     // GET API REQUEST FROM WEATHER API
     axios.get(url)
          .then(({ data }) => {
               const weather = {
                    icon: data.weather[0].icon,
                    name: data.name,
                    country: data.sys.country,
                    main: data.weather[0].main,
                    description: data.weather[0].description,
                    temp: data.main.temp,
                    pressure: data.main.pressure,
                    humidity: data.main.humidity
               }
               setWeather(weather);
               // UPDATE CURRENT DATA IN HISTORY
               if (callback) callback(weather);
          })
          .catch(e => {
               alert("City Not Found")
          })
}

// SET WEATHER DATA
function setWeather(weather) {
     currentIcon.src = `${ICON_URL}${weather.icon}.png`;
     currentCity.innerText = weather.name;
     currentCountry.innerText = weather.country;
     currentCondition.innerText = weather.main;
     description.innerText = weather.description;
     currentTemp.innerText = weather.temp;
     currentPressure.innerText = weather.pressure;
     currentHumidity.innerText = weather.humidity;
}

// CREATE HISTORY ITEM
function updateHistory(history) {
     emptyHistory.innerText = '';
     
     history.forEach(h => {
          let tempHistory = historyItem.cloneNode(true);

          tempHistory.style.display = 'flex';
          tempHistory.setAttribute('name', h._id);

          tempHistory.getElementsByClassName('condition-img')[0].src = `${ICON_URL}${h.icon}.png`;
          tempHistory.getElementsByClassName('city')[0].innerText = h.name;
          tempHistory.getElementsByClassName('country')[0].innerText = h.country;
          tempHistory.getElementsByClassName('main')[0].innerText = h.main;
          tempHistory.getElementsByClassName('description')[0].innerText = h.description;
          tempHistory.getElementsByClassName('temp')[0].innerText = h.temp;
          tempHistory.getElementsByClassName('pressure')[0].innerText = h.pressure;
          tempHistory.getElementsByClassName('humidity')[0].innerText = h.humidity;

          historyElement.insertAdjacentElement("afterbegin", tempHistory);
     })
}

// 
function onClick(btn) {
     const historyElement = btn.parentElement;
     const elementId = historyElement.getAttribute("name")

     axios.delete(DB_URL, { data: { id: elementId } });

     historyElement.remove();
}