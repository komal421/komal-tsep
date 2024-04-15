document.addEventListener('DOMContentLoaded', () => {
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const weatherInfo = document.getElementById('weatherInfo');

    getWeatherBtn.addEventListener('click', async () => {
        const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
        const city = document.getElementById('cityInput').value.trim();

        if (city === '') {
            showError("Please enter a city name");
            return;
        }

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.cod === 200) {
                displayWeather(data);
            } else {
                showError("City not found");
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            showError("An error occurred while fetching data");
        }
    });

    function displayWeather(data) {
        weatherInfo.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <div class="weather-icon">
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}">
                <span>${data.weather[0].description}</span>
            </div>
            <div>Temperature: ${data.main.temp}°C</div>
            <div>Humidity: ${data.main.humidity}%</div>
            <div>Wind Speed: ${data.wind.speed} m/s</div>
        `;
    }

    function showError(message) {
        weatherInfo.innerHTML = `<p class="error">${message}</p>`;
    }
});
