import { Movie, MoviesDto } from "./movies"

export type TvShow = {
  id: number
  backdrop_path: string
  first_air_date: string
  genre_ids: number[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  vote_average: number
  vote_count: number
  name: string
}


export type tvShowDto = {
  page: number
  results: TvShow[]
  total_pages: number
  total_results: number
}


export function mapToMovies(tvshows: TvShow[]): Movie[] {
  return tvshows.map((tvShow: TvShow) => {
    return {
      ...tvShow,
      title: tvShow.name,
      original_title: tvShow.original_name,
      release_date: tvShow.first_air_date,
      poster_path: tvShow.poster_path
    }
  })
}

export function mapToMovie(tvshows: TvShow): Movie {

  return {
    ...tvshows,
    title: tvshows.name,
    original_title: tvshows.original_name,
    release_date: tvshows.first_air_date,
    poster_path: tvshows.poster_path
  }

}

export function mapToMovieDto(TvShowDto: tvShowDto): MoviesDto {
  return {
    results: TvShowDto.results.map(mapToMovie),
    total_pages : TvShowDto.total_pages,
    total_results : TvShowDto.total_results,
    page : TvShowDto.page
  }
}