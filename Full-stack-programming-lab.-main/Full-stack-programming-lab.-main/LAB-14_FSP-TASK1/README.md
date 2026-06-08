# 🌤️ Weather Forecast REST API

A Node.js + Express REST API that integrates with **OpenWeatherMap** to deliver
real-time weather data for any city worldwide.

---

## 📋 Features
- Query weather by city name (query param or URL segment)
- Returns: city name, country, temperature (°C & °F), weather condition, humidity
- Proper error handling for invalid city names, bad API keys, and network failures
- Clean JSON responses

---

## 🚀 Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Get a free OpenWeatherMap API key
1. Register at https://openweathermap.org/api
2. Go to **My API Keys** in your account dashboard
3. Copy your key (it activates within ~10 minutes of registration)

### 3. Configure environment
```bash
cp .env.example .env
# Open .env and paste your API key
```

Or set it inline when starting:
```bash
OPENWEATHER_API_KEY=your_key_here node server.js
```

### 4. Start the server
```bash
npm start          # production
npm run dev        # development with auto-reload (nodemon)
```

---

## 🔗 API Endpoints

### `GET /weather?city=<cityName>`
Fetch weather for a city.

**Example Requests:**
```
GET http://localhost:3000/weather?city=London
GET http://localhost:3000/weather?city=Karachi
GET http://localhost:3000/weather?city=New York
```

**Success Response (200):**
```json
{
  "success": true,
  "city": "London",
  "country": "GB",
  "current_temperature": {
    "celsius": 15.3,
    "fahrenheit": 59.54
  },
  "weather_condition": {
    "main": "Clouds",
    "description": "overcast clouds"
  },
  "humidity": "82%",
  "additional_info": {
    "feels_like_celsius": 14.1,
    "wind_speed_mps": 5.14,
    "visibility_m": 10000
  }
}
```

**Error Response – City Not Found (404):**
```json
{
  "success": false,
  "error": "City \"xyz\" not found. Please check the city name and try again."
}
```

**Error Response – Missing City (400):**
```json
{
  "success": false,
  "error": "City name is required. Usage: /weather?city=London"
}
```

---

## 🧪 Testing with Postman

1. Open Postman → New Request
2. Method: **GET**
3. URL: `http://localhost:3000/weather?city=Islamabad`
4. Click **Send**

### Test Cases to Try
| Test | URL | Expected |
|------|-----|----------|
| Valid city | `/weather?city=Tokyo` | 200 + weather data |
| Invalid city | `/weather?city=FakeCity123` | 404 + error message |
| Missing city | `/weather` | 400 + usage hint |
| Multiple words | `/weather?city=New York` | 200 + weather data |

---

## 🧪 Testing with Browser / curl

```bash
# Valid city
curl "http://localhost:3000/weather?city=Karachi"

# Invalid city
curl "http://localhost:3000/weather?city=NotARealCity"

# Missing city
curl "http://localhost:3000/weather"
```

---

## 📁 Project Structure
```
weather-api/
├── server.js        # Main Express application
├── package.json     # Dependencies & scripts
├── .env.example     # Environment variable template
└── README.md        # This file
```

---

## ⚠️ Notes
- Free OpenWeatherMap tier allows **60 calls/minute**
- API key activation can take up to **10 minutes** after registration
- Temperature is returned in **Celsius** by default (units=metric)
