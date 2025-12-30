const express = require('express');
const app = express();

// Movie Changes List - Get list of movie IDs that have been changed
app.get('/api/movie/changes', async (req, res) => {
  const apiKey = process.env.TMDB_API_KEY;
  const { start_date, end_date, page } = req.query;

  let url = `https://api.themoviedb.org/3/movie/changes?api_key=${apiKey}`;
  if (start_date) url += `&start_date=${start_date}`;
  if (end_date) url += `&end_date=${end_date}`;
  if (page) url += `&page=${page}`;

  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});

// Theatrical Releases - Get list of movies currently in theatres
app.get('/api/movie/theatrical', async (req, res) => {
  const apiKey = process.env.TMDB_API_KEY;
  const { page } = req.query;

  let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
  if (page) url += `&page=${page}`;

  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});

app.get('/api/movie/:id', async (req, res) => {
  const apiKey = process.env.TMDB_API_KEY;
  const response = await fetch(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${apiKey}`);
  const data = await response.json();
  res.json(data);
});

app.get('/api/tv/:id', async (req, res) => {
  const apiKey = process.env.TMDB_API_KEY;
  const response = await fetch(`https://api.themoviedb.org/3/tv/${req.params.id}?api_key=${apiKey}`);
  const data = await response.json();
  res.json(data);
});

module.exports = app;