const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 4001;
const NEWS_API_KEY = 'YOUR_API_KEY_HERE'; // Get free key at https://newsapi.org/
const NEWS_BASE_URL = 'https://newsapi.org/v2/top-headlines';

app.use(express.json());

// ─────────────────────────────────────────────
// GET /news/:country  — e.g. /news/us  /news/pk
// ─────────────────────────────────────────────
app.get('/news/:country', async (req, res) => {
  const { country } = req.params;

  // Validate: country code must be exactly 2 letters
  if (!country || !/^[a-zA-Z]{2}$/.test(country)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid country code. Please use a 2-letter ISO code. Example: /news/us or /news/pk'
    });
  }

  try {
    const response = await axios.get(NEWS_BASE_URL, {
      params: {
        country: country.toLowerCase(),
        pageSize: 10,
        apiKey: NEWS_API_KEY
      }
    });

    const articles = response.data.articles;

    if (!articles || articles.length === 0) {
      return res.status(404).json({
        success: false,
        error: `No news headlines found for country code "${country.toUpperCase()}". Try a different country code.`
      });
    }

    // Build structured response with required fields
    const headlines = articles.slice(0, 10).map((article, index) => ({
      index: index + 1,
      title: article.title || 'No title available',
      source: article.source?.name || 'Unknown source',
      url: article.url || 'No URL available',
      published_at: article.publishedAt
        ? new Date(article.publishedAt).toLocaleString('en-US', { timeZone: 'UTC' }) + ' UTC'
        : 'Date not available'
    }));

    return res.status(200).json({
      success: true,
      country: country.toUpperCase(),
      total_results: response.data.totalResults,
      articles_returned: headlines.length,
      headlines
    });

  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || 'Unknown error';

      if (status === 401) {
        return res.status(401).json({ success: false, error: 'Invalid API key. Please check your NewsAPI key.' });
      }
      if (status === 429) {
        return res.status(429).json({ success: false, error: 'API rate limit exceeded. Please wait before retrying.' });
      }
      return res.status(status).json({ success: false, error: `News service error: ${message}` });
    }
    return res.status(503).json({ success: false, error: 'Unable to reach the news service. Please try again later.' });
  }
});

// ─────────────────────────────────────────────
// Root – usage guide
// ─────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    message: 'News Headlines API',
    usage: {
      endpoint: 'GET /news/:country',
      examples: ['/news/us', '/news/pk', '/news/gb', '/news/in']
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found. Usage: /news/:country (e.g. /news/us)' });
});

app.listen(PORT, () => console.log(`✅ News API running on http://localhost:${PORT}`));

module.exports = app;
