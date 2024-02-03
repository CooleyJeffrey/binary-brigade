document.addEventListener("DOMContentLoaded", function () {
    const weatherElement = document.getElementById('weather-display');
    const newsList = document.getElementById('news-list');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const weatherSearchInput = document.getElementById('weather-search-input');
    const weatherSearchButton = document.getElementById('weather-search-button');

    const weatherApiKey = '8b5197e33de4d2ab503208b076814a9e';
    const newsApiKey = '92eAk2h5NotfAJuwLDQj83mQJ7bAcpCK';

    // Function to fetch news articles
    async function fetchNewsArticles(searchKeyword) {
        const newsApiUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchKeyword}&api-key=${newsApiKey}`;
        try {
            const response = await fetch(newsApiUrl);
            const data = await response.json();
            return data.response.docs; // assuming 'articles' is an array in 'response'
        } catch (error) {
            console.error('Error fetching news:', error);
            newsList.innerHTML = '<p>Error fetching news</p>';
            return [];
        }
    }

    // Function to render articles in the list
    function renderArticles(articles) {
        newsList.innerHTML = '';
        articles.forEach((article) => {
            const articleElement = document.createElement('div');
            articleElement.classList.add('article');

            const titleElement = document.createElement('h2');
            titleElement.textContent = article.headline.main;

            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = article.abstract;

            const sourceElement = document.createElement('p');
            sourceElement.textContent = `Source: ${article.source}`;

            const linkElement = document.createElement('a');
            linkElement.textContent = 'Read more';
            linkElement.href = article.web_url;
            linkElement.target = '_blank';

            articleElement.appendChild(titleElement);
            articleElement.appendChild(descriptionElement);
            articleElement.appendChild(sourceElement);
            articleElement.appendChild(linkElement);

            newsList.appendChild(articleElement);
        });
    }

    // Function to handle search button click
    async function handleSearchButtonClick() {
        const searchKeyword = searchInput.value.trim();
        if (searchKeyword !== '') {
            const articles = await fetchNewsArticles(searchKeyword);
            renderArticles(articles);
        }
    }

    // Function to handle weather search button click
    function handleWeatherSearchButtonClick() {
        const weatherQuery = weatherSearchInput.value.trim();
        if (weatherQuery !== '') {
            updateWeather(weatherQuery);
        } else {
            // If the search input is empty, display an error message
            weatherElement.innerHTML = '<p>Please enter a valid city name</p>';
        }
    }

    // Function to update weather data
    async function updateWeather(city) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`);
            
            if (!response.ok) {
                throw new Error('Weather data not found');
            }

            const data = await response.json();

            // Extract relevant weather information from the response
            const weatherDescription = data.weather[0].description;
            const temperatureCelsius = data.main.temp;
            const temperatureFahrenheit = (temperatureCelsius * 9/5) + 32;

            // Update the weather display on your page
            weatherElement.innerHTML = `Weather: ${weatherDescription}, Temperature: ${temperatureCelsius}°C / ${temperatureFahrenheit}°F`;
        } catch (error) {
            console.error('Error fetching weather:', error);
            weatherElement.innerHTML = '<p>Error fetching weather</p>';
        }
    }

    // Event listeners
    searchButton.addEventListener('click', handleSearchButtonClick);
    weatherSearchButton.addEventListener('click', handleWeatherSearchButtonClick);
});
