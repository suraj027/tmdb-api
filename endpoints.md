# API Endpoints Documentation

Base URL: `[Your Vercel Deployment URL]` (e.g., `http://localhost:3000` for local dev)

## Movies

### Get Movie Details
Fetches details for a specific movie.
- **Endpoint**: `/api/movie/:id`
- **Method**: `GET`
- **Parameters**: `id` (TMDB Movie ID)

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
