const express = require('express');
const app = express();

app.get('/api/movie/:id', async (req, res) => {
  const apiKey = process.env.TMDB_API_KEY;
  const response = await fetch(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${apiKey}`);
  const data = await response.json();
  res.json(data);
});

module.exports = app;