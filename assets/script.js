 // Fetch news data and update HTML elements(set html)
 function updateNews() {
    const apiKey = 'acbe75f58962484c92da30b065c322f8';
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const newsList = document.getElementById('news-list');
        console.log("hi");

        // Clear previous news items
        newsList.innerHTML = '';

        // Add news articles to the list
        data.articles.forEach(article => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
          newsList.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error('Error fetching news:', error);
      });
  }

  // Call the updateNews function to fetch and update news information
  updateNews();
// Fetch weather data and update HTML elements (set html)
function updateWeather() {
    const apiKey = 'ba8466dd7c66421db6f25302243001';
    const city = 'New York'; // Example city
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Update HTML elements with weather information
        document.getElementById('weather-description').textContent = data.weather[0].description;
        document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
        document.getElementById('location').textContent = `Location: ${data.name}, ${data.sys.country}`;
      })
      .catch(error => {
        console.error('Error fetching weather:', error);
      });
  }
  
  // Call the updateWeather function to fetch and update weather information
  updateWeather();