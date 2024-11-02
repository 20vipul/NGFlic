import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { map, Observable, throttleTime } from 'rxjs';
import { Movie, MoviesDto } from '../../types/movies';
import { PaginatorState } from 'primeng/paginator';
import { ActivatedRoute } from '@angular/router';
import { TvshowsService } from '../../services/tvshows.service';
import { mapToMovieDto } from '../../types/tvshow';

@Component({
  selector: 'app-shows-list',
  templateUrl: './shows-list.component.html',
  styleUrl: './shows-list.component.css'
})
export class ShowsListComponent implements OnInit {

  showList$: Observable<MoviesDto> | null = null
  searchValue = ''
  showsType: 'movie' | 'tv' = 'movie';

  constructor(private router: ActivatedRoute, private moviesService: MoviesService, private tvservices : TvshowsService) { }


  ngOnInit() {
    this.router.params.subscribe(params => {
      console.log(params);
      this.showsType = params['type']
      this.getPagedShows(this.showsType,1)
    })
  }

  getPagedShows(showstype: 'movie' | 'tv', page: number, searchValue?: string) {
    if(showstype === 'movie'){
      this.showList$ = this.moviesService.searchMovies(page, searchValue);
    }
    if(showstype === 'tv'){
      this.showList$ = this.tvservices.searchTvShows(page,searchValue).pipe(map(mapToMovieDto))
    }
  }

  searchChanged() {
    this.getPagedShows(this.showsType, 1, this.searchValue)
  }

  pageChanged(event: PaginatorState) {
    const pageNumber: number = event.page ? event.page + 1 : 1
    console.log(pageNumber);

    this.getPagedShows(this.showsType,pageNumber, this.searchValue)

  }
}
