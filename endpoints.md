# API Endpoints Documentation

Base URL: `[Your Vercel Deployment URL]` (e.g., `http://localhost:3000` for local dev)

## Movies

### Get Movie Details
Fetches details for a specific movie.
- **Endpoint**: `/api/movie/:id`
- **Method**: `GET`
- **Parameters**: `id` (TMDB Movie ID)
- **Response**: Returns movie object with:
  - Standard movie details (title, overview, etc.)
  - `runtime`: Movie duration in minutes
  - `budget` / `production_cost`: Production cost in USD
  - `revenue`: Box office revenue in USD
  - `rating`: Average user rating (0-10)
  - `content_ratings`: content rating (e.g., "PG-13", "A")
  - `status`: Release status (e.g., "Released", "Post Production", "In Production")
  - `watch_providers`: Streaming availability by country (e.g., inside `results.IN` for India)
  - `credits`: Cast and crew
  - `videos`: Trailers and teasers
  - `images`: Posters and backdrops
  - `similar`: Similar movies
  - `recommendations`: Recommended movies
  - `director_movies`: List of other movies by the same director
  - `collection`: Collection details including parts (sequels/prequels), if available

### Get Theatrical Releases (India)
Fetches movies currently playing in theaters in India.
- **Endpoint**: `/api/movie/theatrical`
- **Method**: `GET`
- **Query Params**: 
  - `page` (optional): Page number

### Get Streaming Movies (India)
Fetches movies currently available for streaming, rent, or buy in India.
- **Endpoint**: `/api/movie/streaming`
- **Method**: `GET`
- **Query Params**: 
  - `page` (optional): Page number

### Get Coming Soon Movies
Fetches movies scheduled to be released soon.
- **Endpoint**: `/api/movie/upcoming`
- **Method**: `GET`
- **Query Params**:
  - `page` (optional): Page number

### Explore Movies
Discover movies with various filters.
- **Endpoint**: `/api/movie/explore`
- **Method**: `GET`
- **Query Params**:
  - `sort_by` (optional): Sort options (e.g., `popularity.desc`)
  - `with_genres` (optional): Comma separated genre IDs
  - `primary_release_year` (optional): Filter by release year
  - `page` (optional): Page number

### Get Comedy Movies
Fetches a list of comedy movies.
- **Endpoint**: `/api/movie/comedy`
- **Method**: `GET`
- **Query Params**:
  - `page` (optional): Page number

### Get Horror Movies
Fetches a list of horror movies.
- **Endpoint**: `/api/movie/horror`
- **Method**: `GET`
- **Query Params**:
  - `page` (optional): Page number

### Get Movie Changes
Fetches a list of movie IDs that have been updated.
- **Endpoint**: `/api/movie/changes`
- **Method**: `GET`
- **Query Params**:
  - `start_date` (optional): Filter from date (YYYY-MM-DD)
  - `end_date` (optional): Filter to date (YYYY-MM-DD)
  - `page` (optional): Page number

---

## TV Shows

### Get TV Show Details
Fetches details for a specific TV show.
- **Endpoint**: `/api/tv/:id`
- **Method**: `GET`
- **Parameters**: `id` (TMDB TV Show ID)
- **Response**: Returns TV show object with:
  - Standard TV show details (name, overview, etc.)
  - `credits`: Cast and crew
  - `videos`: Trailers and teasers
  - `images`: Posters and backdrops
  - `similar`: Similar TV shows
  - `recommendations`: Recommended TV shows
  - `creator_shows`: List of other TV shows by the same creator

### Get Streaming TV Shows (India)
Fetches TV shows currently available for streaming, rent, or buy in India.
- **Endpoint**: `/api/tv/streaming`
- **Method**: `GET`
- **Query Params**:
  - `page` (optional): Page number

### Get Popular TV Shows
Fetches a list of current popular TV shows.
- **Endpoint**: `/api/tv/popular`
- **Method**: `GET`
- **Query Params**:
  - `page` (optional): Page number

### Get Coming Soon TV Shows
Fetches TV shows airing in the next 7 days.
- **Endpoint**: `/api/tv/on-the-air`
- **Method**: `GET`
- **Query Params**:
  - `page` (optional): Page number
  - `page` (optional): Page number

## Watch Providers

### Get Movie Watch Providers
Fetches list of available streaming providers for movies.
- **Endpoint**: `/api/watch-providers/movie`
- **Method**: `GET`
- **Query Params**:
  - `watch_region` (optional): Country code (default: `IN`)

### Get TV Watch Providers
Fetches list of available streaming providers for TV shows.
- **Endpoint**: `/api/watch-providers/tv`
- **Method**: `GET`
- **Query Params**:
  - `watch_region` (optional): Country code (default: `IN`)
