

// Fetch weather data and update HTML elements (set html)
const weatherApiKey = '8b5197e33de4d2ab503208b076814a9e'; // Replace 'API_KEY' with actual OpenWeatherMap API key

async function updateWeather(city = 'Philadelphia') {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=imperial`);
    const data = await response.json();

    // Update HTML elements with weather information
    document.getElementById('weather-description').textContent = data.weather[0].description;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °F`;
    document.getElementById('location').textContent = `Location: ${data.name}, ${data.sys.country}`;
  } catch (error) {
    console.error('Error fetching weather:', error);
  }
}

// Search function for news and weather
function search() {
  const weatherQuery = document.getElementById('weather-search-input').value;
  updateWeather(weatherQuery);

  const newsQuery = document.getElementById('news-search-input').value;
  updateNews(newsQuery);
}

// // Event listener for search button
// document.getElementById('search-button').addEventListener('click', search);

// Initial data update
updateWeather();
