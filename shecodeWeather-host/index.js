function displayTemperature(response) {



  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let windSpeedElement = document.querySelector("#wind-speed");
let icon = document.querySelector("#icon");


  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML =` ${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML =` ${response.data.wind.speed} Km/hr `;
  icon.innerHTML =`<img src="${response.data.condition.icon_url}" class="current-temperature-icon"/>`


 getForecast(response.data);
 }




function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "4c8b405tf587a604fdd58fod46b3f159";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl)
    .then(displayTemperature)
    .catch(function (error) {
      console.error("API call failed:", error);
    });


  }


 


function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);




function getForecast(city){
  let apiKey = "4c8b405tf587a604fdd58fod46b3f159";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
   

}


function formatDay(timestamp) {
  let date = new Date(timestamp *1000);
  let days = [
    "Sun",
    "Mon",
    "Tues",
    "Wedn",
    "Thurs",
    "Fri",
    "Sat"
  ];

  return days[date.getDay()];
 

  
}




function displayForecast(response) {

  
  
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if(index < 6) {
    forecastHtml =
    forecastHtml +
    `
      <div class="weather-forecast-below-day">
          <div class="weather-forecast-below-date">${formatDay(day.time)}</div>
          <div class="weather-forecast-below-icon">
          <img src="${day.condition.icon_url}"  class="weather-forecast-below-icon"/>
          </div>
          <div class="weather-forecast-below-temperatures">
            <div class="weather-forecast-below-temperatur">
              <strong>${Math.round(day.temperature.maximum)}°C</strong>
              <div><strong>
                  ${Math.round(day.temperature.minimum)}°C
                </strong>
              </div>
            </div>
          </div>
        </div>
      
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

displayForecast(response.data);
