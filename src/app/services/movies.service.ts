import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneresDto, Movie, MoviesDto } from './../types/movies';
import { map } from 'rxjs';
import { videoDto } from '../types/video';
import { ImagesDto } from '../types/images';
import { CreditsDto } from '../types/credits';

// @Injectable({
//   providedIn: 'root'
// })
// This configuration would make MoviesService available throughout the app via the root injector.
// However, if you remove 'providedIn: root' or don't configure it correctly, 
// Angular will throw an error: "No provider for MoviesService."
// To fix this, go to app.module.ts and manually add MoviesService to the 'providers' array:
// providers: [MoviesService]

@Injectable()
export class MoviesService {

  constructor(private http: HttpClient) { }
  // popularApi: string = 'https://api.themoviedb.org/3/movie/popular'

  private movieUrl = 'https://api.themoviedb.org/3'
  private apiKey = 'c57541ef219d34103e8d5a45e3590962'


  // getMoviesByType(type:string) {
  //   return this.http.get<MoviesDto>(
  //     // this.popularApi + '?api_key=c57541ef219d34103e8d5a45e3590962' 
  //     `${this.movieUrl}/movie/${type}?api_key=${this.apiKey}`
  //   )
  // }

  getMoviesByType(type: string, count = 20) {
    return this.http.get<MoviesDto>(
      `${this.movieUrl}/movie/${type}?api_key=${this.apiKey}`
    ).pipe(map((data) => { return data.results.slice(0, count) }))
  }

  getMovieByID(id: number) {
    return this.http.get<Movie>(
      `${this.movieUrl}/movie/${id}?api_key=${this.apiKey}`
    ).pipe(map((data) => { return data }))
  }

  getMovieVideos(id: number) {
    return this.http.get<videoDto>(
      `${this.movieUrl}/movie/${id}/videos?api_key=${this.apiKey}`
    ).pipe(map((data) => { return data.results }))
  }

  getMovieImages(id: number) {
    return this.http.get<ImagesDto>(
      `${this.movieUrl}/movie/${id}/images?api_key=${this.apiKey}`
    ).pipe(map((data) => { return data.backdrops }))
  }

  getMovieCast(id: number) {
    return this.http.get<CreditsDto>(
      `${this.movieUrl}/movie/${id}/credits?api_key=${this.apiKey}`
    ).pipe(map((data) => { return data.cast }))
  }


  getSimilarMovie(id: number, count = 20) {
    return this.http.get<MoviesDto>(
      `${this.movieUrl}/movie/${id}/similar?api_key=${this.apiKey}`
    ).pipe(map((data) => { return data.results.slice(0, count) }))
  }

  searchMovies(page: number, searchValue?: string) {
    const uri = searchValue ? '/search/movie' : '/movie/popular'
    return this.http.get<MoviesDto>(
      `${this.movieUrl}${uri}?query=${searchValue}&page=${page}&api_key=${this.apiKey}`
    )
  }

  getMoviesGeneres() {
    return this.http.get<GeneresDto>(
      `${this.movieUrl}/genre/movie/list?api_key=${this.apiKey}`
    ).pipe(map(data => { return data.genres }))
  }


  getMoviesByGenres(gId: number | null ,page:number) {
    const uri = gId ? `with_genres=${gId}&page=${page}&` : `page=${page}&`
    return this.http.get<MoviesDto>(
      `${this.movieUrl}/discover/movie?${uri}api_key=${this.apiKey}`
    )
  }


  // getPopularMovies() {
  //   return this.http.get<MoviesDto>(
  //     // this.popularApi + '?api_key=c57541ef219d34103e8d5a45e3590962'
  //     `${this.movieUrl}/movie/popular?api_key=${this.apiKey}`
  //   )
  // }

  // getUpcomingMovies() {
  //   return this.http.get<MoviesDto>(
  //     `${this.movieUrl}/movie/upcoming?api_key=${this.apiKey}`
  //   )
  // }

  // getTopRatedMovies() {
  //   return this.http.get<MoviesDto>(
  //     `${this.movieUrl}/movie/top_rated?api_key=${this.apiKey}`
  //   )
  // }
}
