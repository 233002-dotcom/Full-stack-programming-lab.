const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Your OpenWeatherMap API key (free tier at https://openweathermap.org/api)
const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || 'YOUR_API_KEY_HERE';
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Middleware
app.use(express.json());

// ─────────────────────────────────────────────
// GET /weather?city=<cityName>
// ─────────────────────────────────────────────
app.get('/weather', async (req, res) => {
  const { city } = req.query;

  // Validate input
  if (!city || city.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'City name is required. Usage: /weather?city=London',
    });
  }

  try {
    const response = await axios.get(WEATHER_BASE_URL, {
      params: {
        q: city.trim(),
        appid: WEATHER_API_KEY,
        units: 'metric', // Celsius
      },
    });

    const data = response.data;

    // Build the response in the required format
    const weatherInfo = {
      success: true,
      city: data.name,
      country: data.sys.country,
      current_temperature: {
        celsius: data.main.temp,
        fahrenheit: parseFloat(((data.main.temp * 9) / 5 + 32).toFixed(2)),
      },
      weather_condition: {
        main: data.weather[0].main,
        description: data.weather[0].description,
      },
      humidity: `${data.main.humidity}%`,
      additional_info: {
        feels_like_celsius: data.main.feels_like,
        wind_speed_mps: data.wind.speed,
        visibility_m: data.visibility,
      },
    };

    return res.status(200).json(weatherInfo);
  } catch (error) {
    // Handle OpenWeatherMap specific errors
    if (error.response) {
      const status = error.response.status;

      if (status === 404) {
        return res.status(404).json({
          success: false,
          error: `City "${city}" not found. Please check the city name and try again.`,
        });
      }

      if (status === 401) {
        return res.status(401).json({
          success: false,
          error: 'Invalid API key. Please check your OpenWeatherMap API key.',
        });
      }

      return res.status(status).json({
        success: false,
        error: `Weather service error: ${error.response.data.message || 'Unknown error'}`,
      });
    }

    // Network / timeout errors
    return res.status(503).json({
      success: false,
      error: 'Unable to reach the weather service. Please try again later.',
    });
  }
});

// ─────────────────────────────────────────────
// GET /weather/:city  (alternative route style)
// ─────────────────────────────────────────────
app.get('/weather/:city', async (req, res) => {
  // Redirect to query-param handler
  req.query.city = req.params.city;
  res.redirect(`/weather?city=${encodeURIComponent(req.params.city)}`);
});

// ─────────────────────────────────────────────
// Root – usage guide
// ─────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    message: 'Weather Forecast API',
    usage: {
      endpoint: 'GET /weather?city=<cityName>',
      examples: [
        '/weather?city=London',
        '/weather?city=Karachi',
        '/weather?city=New York',
      ],
    },
  });
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found.' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Weather API server running on http://localhost:${PORT}`);
  console.log(`📍 Try: http://localhost:${PORT}/weather?city=London`);
});

module.exports = app;
