import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { TvShow, tvShowDto } from '../types/tvshow';
import { CreditsDto } from '../types/credits';
import { ImagesDto } from '../types/images';
import { videoDto } from '../types/video';
import { GeneresDto } from '../types/movies';

@Injectable()
export class TvshowsService {

  constructor(private http: HttpClient) { }
  private tvShowUrl = 'https://api.themoviedb.org/3'
  private apiKey = 'c57541ef219d34103e8d5a45e3590962'

  getTvShowsByType(type: string, count = 20) {
    return this.http.get<tvShowDto>(
      `${this.tvShowUrl}/tv/${type}?api_key=${this.apiKey}`
    ).pipe(map((data) => { return data.results.slice(0, count) }))
  }

  getTvShowsByID(id: number) {
    return this.http.get<TvShow>(
      `${this.tvShowUrl}/tv/${id}?api_key=${this.apiKey}`
    )
  }

  getTvShowsVideos(id: number) {
    return this.http.get<videoDto>(
      `${this.tvShowUrl}/tv/${id}/videos?api_key=${this.apiKey}`
    ).pipe(map((data) => { return data.results }))
  }

  getTvShowsImages(id: number) {
    return this.http.get<ImagesDto>(
      `${this.tvShowUrl}/tv/${id}/images?api_key=${this.apiKey}`
    ).pipe(map((data) => { return data.backdrops }))
  }

  getTvShowsCast(id: number) {
    return this.http.get<CreditsDto>(
      `${this.tvShowUrl}/tv/${id}/credits?api_key=${this.apiKey}`
    ).pipe(map((data) => { return data.cast }))
  }

  getSimilarTvShows(id: number, count = 20) {
    return this.http.get<tvShowDto>(
      `${this.tvShowUrl}/tv/${id}/similar?api_key=${this.apiKey}`
    ).pipe(map((data) => { return data.results.slice(0, count) }))
  }

  searchTvShows(page: number, searchValue?: string) {
    const uri = searchValue ? '/search/tv' : '/tv/popular'
    return this.http.get<tvShowDto>(
      `${this.tvShowUrl}${uri}?query=${searchValue}&page=${page}&api_key=${this.apiKey}`
    )
  }



  getTvShowGeneres() {
    return this.http.get<GeneresDto>(
      `${this.tvShowUrl}/genre/tv/list?api_key=${this.apiKey}`
    ).pipe(map(data => { return data.genres }))
  }


  // https://api.themoviedb.org/3/discover/tv
  
  getTvShowByGeneres(gId: number | null, page: number) {
    const uri = gId ? `with_genres=${gId}&page=${page}&` : `page=${page}&`
    return this.http.get<tvShowDto>(
      `${this.tvShowUrl}/discover/tv?${uri}api_key=${this.apiKey}`
    )
  }

}
