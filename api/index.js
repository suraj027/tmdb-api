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

  let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&region=IN`;
  if (page) url += `&page=${page}`;

  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});

// Streaming Movies - Get list of movies currently available for streaming/rent/buy
app.get('/api/movie/streaming', async (req, res) => {
  const apiKey = process.env.TMDB_API_KEY;
  const { page } = req.query;

  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&watch_region=IN&with_watch_monetization_types=flatrate|rent|buy`;
  if (page) url += `&page=${page}`;

  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});

// Coming Soon Movies - Get list of movies being released soon
app.get('/api/movie/upcoming', async (req, res) => {
  const apiKey = process.env.TMDB_API_KEY;
  const { page } = req.query;

  let url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&region=IN`;
  if (page) url += `&page=${page}`;

  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});

// Explore Movies - Discover movies with filters
app.get('/api/movie/explore', async (req, res) => {
  const apiKey = process.env.TMDB_API_KEY;
  const { sort_by, with_genres, primary_release_year, page } = req.query;

  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
  if (sort_by) url += `&sort_by=${sort_by}`;
  if (with_genres) url += `&with_genres=${with_genres}`;
  if (primary_release_year) url += `&primary_release_year=${primary_release_year}`;
  if (page) url += `&page=${page}`;

  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});

// Comedy Movies - Get list of comedy movies
app.get('/api/movie/comedy', async (req, res) => {
  const apiKey = process.env.TMDB_API_KEY;
  const { page } = req.query;

  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=35`;
  if (page) url += `&page=${page}`;

  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});

// Horror Movies - Get list of horror movies
app.get('/api/movie/horror', async (req, res) => {
  const apiKey = process.env.TMDB_API_KEY;
  const { page } = req.query;

  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27`;
  if (page) url += `&page=${page}`;

  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});

// Streaming TV Shows - Get list of TV shows currently available for streaming/rent/buy
app.get('/api/tv/streaming', async (req, res) => {
  const apiKey = process.env.TMDB_API_KEY;
  const { page } = req.query;

  let url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&watch_region=IN&with_watch_monetization_types=flatrate|rent|buy`;
  if (page) url += `&page=${page}`;

  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});

// Popular TV Shows - Get list of popular TV shows
app.get('/api/tv/popular', async (req, res) => {
  const apiKey = process.env.TMDB_API_KEY;
  const { page } = req.query;

  let url = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`;
  if (page) url += `&page=${page}`;

  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});

// Coming Soon TV Shows - Get list of TV shows airing in the next 7 days
app.get('/api/tv/on-the-air', async (req, res) => {
  const apiKey = process.env.TMDB_API_KEY;
  const { page } = req.query;

  let url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${apiKey}`;
  if (page) url += `&page=${page}`;

  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});

app.get('/api/movie/:id', async (req, res) => {
  const apiKey = process.env.TMDB_API_KEY;
  const movieId = req.params.id;

  try {
    // 1. Fetch movie details with append_to_response
    const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=credits,videos,images,similar,recommendations`;
    const movieResponse = await fetch(movieUrl);
    const movieData = await movieResponse.json();

    if (!movieData || movieData.success === false) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }

    // 2. Find the director
    const director = movieData.credits?.crew?.find(person => person.job === 'Director');

    let directorMovies = [];
    if (director) {
      // 3. Fetch movies by the director
      const directorUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_crew=${director.id}&sort_by=popularity.desc&page=1`;
      const directorResponse = await fetch(directorUrl);
      const directorData = await directorResponse.json();
      directorMovies = directorData.results || [];
    }

    // 4. Fetch Collection Details (Sequels/Prequels)
    let collectionData = null;
    if (movieData.belongs_to_collection) {
      const collectionId = movieData.belongs_to_collection.id;
      const collectionUrl = `https://api.themoviedb.org/3/collection/${collectionId}?api_key=${apiKey}`;
      const collectionResponse = await fetch(collectionUrl);
      collectionData = await collectionResponse.json();
    }

    // 5. Combine and send response
    // Filter out the current movie from director's movies if desired, or keep it. 
    // Usually it's nice to see their other work, so filtering the current one is good practice.
    const otherMoviesByDirector = directorMovies.filter(m => m.id !== parseInt(movieId));

    res.json({
      ...movieData,
      director_movies: otherMoviesByDirector,
      collection: collectionData
    });

  } catch (error) {
    console.error("Error fetching movie details:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.get('/api/tv/:id', async (req, res) => {
  const apiKey = process.env.TMDB_API_KEY;
  const tvId = req.params.id;

  try {
    // 1. Fetch TV show details with append_to_response
    const tvUrl = `https://api.themoviedb.org/3/tv/${tvId}?api_key=${apiKey}&append_to_response=credits,videos,images,similar,recommendations`;
    const tvResponse = await fetch(tvUrl);
    const tvData = await tvResponse.json();

    if (!tvData || tvData.success === false) {
      return res.status(404).json({ success: false, message: "TV show not found" });
    }

    // 2. Find the creator (created_by field) or find director/showrunner from crew
    // TV shows typically have a 'created_by' array
    const creator = tvData.created_by?.[0];

    let creatorShows = [];
    if (creator) {
      // 3. Fetch TV shows by the creator using person's credits
      const creatorUrl = `https://api.themoviedb.org/3/person/${creator.id}/tv_credits?api_key=${apiKey}`;
      const creatorResponse = await fetch(creatorUrl);
      const creatorData = await creatorResponse.json();
      // Get crew credits where they are creator/executive producer
      creatorShows = creatorData.crew?.filter(show =>
        show.job === 'Creator' || show.job === 'Executive Producer'
      ) || [];
    }

    // 4. Combine and send response
    const otherShowsByCreator = creatorShows.filter(s => s.id !== parseInt(tvId));

    res.json({
      ...tvData,
      creator_shows: otherShowsByCreator
    });

  } catch (error) {
    console.error("Error fetching TV show details:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});



// Watch Providers (Movies) - Get list of streaming providers for movies
app.get('/api/watch-providers/movie', async (req, res) => {
  const apiKey = process.env.TMDB_API_KEY;
  const { watch_region = 'IN' } = req.query;

  const response = await fetch(`https://api.themoviedb.org/3/watch/providers/movie?api_key=${apiKey}&watch_region=${watch_region}`);
  const data = await response.json();
  res.json(data);
});

// Watch Providers (TV) - Get list of streaming providers for TV shows
app.get('/api/watch-providers/tv', async (req, res) => {
  const apiKey = process.env.TMDB_API_KEY;
  const { watch_region = 'IN' } = req.query;

  const response = await fetch(`https://api.themoviedb.org/3/watch/providers/tv?api_key=${apiKey}&watch_region=${watch_region}`);
  const data = await response.json();
  res.json(data);
});

module.exports = app;