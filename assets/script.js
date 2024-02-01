// Fetch news data and update HTML elements(set html)
const newsApiKey = '9a75b8ec02a84d67a432cd48764a03f5'; // News API key

const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiKey}`;

async function updateNews(query = '') {
  try {
    const response = await fetch(query ? `${newsApiUrl}&q=${query}` : newsApiUrl);
    const data = await response.json();

    const newsList = document.getElementById('news-list');
    newsList.innerHTML = '';

    data.articles.forEach(article => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
      newsList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error fetching news:', error);
  }
}

// Fetch weather data and update HTML elements (set html)
const weatherApiKey = 'API_KEY'; // Replace 'API_KEY' with actual OpenWeatherMap API key

async function updateWeather(city = 'New York') {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}`);
    const data = await response.json();

    // Update HTML elements with weather information
    document.getElementById('weather-description').textContent = data.weather[0].description;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
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

// Event listener for search button
document.getElementById('search-button').addEventListener('click', search);

// Initial data update
updateNews();
updateWeather();