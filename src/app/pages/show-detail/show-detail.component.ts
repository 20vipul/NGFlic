import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { map, Observable } from 'rxjs';
import { Movie } from '../../types/movies';
import { Image_Sizes } from '../../constants/images_sizes'
import { Video } from '../../types/video';
import { Images } from '../../types/images';
import { Actor } from '../../types/credits';
import { TvshowsService } from '../../services/tvshows.service';
import { mapToMovie, mapToMovies } from '../../types/tvshow';


@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrl: './show-detail.component.css',
})
export class ShowDetailComponent implements OnInit {
  ShowID = 0;
  showType: 'tv' | 'movie' = 'movie'



  constructor(private router: ActivatedRoute, private moviesService: MoviesService, private tvservices: TvshowsService) { }
  show$: Observable<Movie> | null = null;
  showVideos$: Observable<Video[]> | null = null
  showImages$: Observable<Images[]> | null = null
  showCast$: Observable<Actor[]> | null = null
  similarShow$: Observable<Movie[]> | null = null
  images_Sizes = Image_Sizes

  ngOnInit() {

    this.router.params.subscribe(params => {

      this.ShowID = params['id']
      this.showType = params['type']

      if (this.showType === 'movie') {
        this.show$ = this.moviesService.getMovieByID(this.ShowID)
        this.showVideos$ = this.moviesService.getMovieVideos(this.ShowID)
        this.showImages$ = this.moviesService.getMovieImages(this.ShowID)
        this.showCast$ = this.moviesService.getMovieCast(this.ShowID)
        this.similarShow$ = this.moviesService.getSimilarMovie(this.ShowID, 6)
      }
      if (this.showType === 'tv') {
        this.show$ = this.tvservices.getTvShowsByID(this.ShowID).pipe(map(mapToMovie))
        this.showVideos$ = this.tvservices.getTvShowsVideos(this.ShowID)
        this.showImages$ = this.tvservices.getTvShowsImages(this.ShowID)
        this.showCast$ = this.tvservices.getTvShowsCast(this.ShowID)
        this.similarShow$ = this.tvservices.getSimilarTvShows(this.ShowID, 6).pipe(map(mapToMovies))
      }
    });

    //Alternate method
    // this.ShowID = this.router.snapshot.params['id']

  }
}
