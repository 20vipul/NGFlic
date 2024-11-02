import { Component } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { TvshowsService } from '../../services/tvshows.service';
import { map } from 'rxjs';
import { mapToMovies } from '../../types/tvshow';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private moviesService: MoviesService, private tvService: TvshowsService) { }
  // upComingMovies$ = this.moviesService.getUpcomingMovies()
  // topRatedMovies$ =this.moviesService.getTopRatedMovies ()

  popularMovies$ = this.moviesService.getMoviesByType('popular', 12);
  upComingMovies$ = this.moviesService.getMoviesByType('upcoming', 12);
  topRatedMovies$ = this.moviesService.getMoviesByType('top_rated', 12);
  popularTvShows$ = this.tvService.getTvShowsByType('popular', 12)
    .pipe(map(mapToMovies))
}
