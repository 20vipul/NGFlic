import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Generes, Movie, MoviesDto } from '../../types/movies';
import { map, Observable } from 'rxjs';
import { PaginatorState } from 'primeng/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { TvshowsService } from '../../services/tvshows.service';
import { mapToMovieDto } from '../../types/tvshow';

@Component({
  selector: 'app-generes',
  templateUrl: './generes.component.html',
  styleUrl: './generes.component.css'
})
export class GeneresComponent implements OnInit {
  genresMovie$: Observable<Generes[]> | null = null
  genresTvShow$: Observable<Generes[]> | null = null
  shows$: Observable<MoviesDto> | null = null
  showType: 'movie' | 'tv' = 'movie'
  prevST: 'movie' | 'tv' = 'movie'
  gID: number | null = null
  hname: string | null = null
  page: number = 1
  prevGid: number | null = null
  constructor(private movieservice: MoviesService, private tvservice: TvshowsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.genresMovie$ = this.movieservice.getMoviesGeneres()
    this.genresTvShow$ = this.tvservice.getTvShowGeneres()
    this.route.params.subscribe((params) => {
      this.gID = params['genresId']
      this.page = params['page'] || 1
      this.showType = params['showtype']
      console.log(this.showType);


      if ((this.prevGid !== this.gID && this.prevST == this.showType)) {
        console.log("Ngoninit");
        this.prevGid = this.gID
        console.log(this.page);

        this.router.navigate(['/genres', this.showType, this.gID, this.page]);

        this.loadShowItem()
      } else if ((this.prevGid == this.gID && this.prevST !== this.showType)) {
        this.loadShowItem()
      } else if ((this.prevGid !== this.gID && this.prevST !== this.showType)) {
        this.loadShowItem()
      }
    })
  }

  loadShowItem() {
    console.log("=================showtype  =   " + this.showType);

    if (this.showType === 'movie') {
      this.shows$ = this.movieservice.getMoviesByGenres(this.gID, this.page);
    } else if (this.showType === 'tv') {
      this.shows$ = this.tvservice.getTvShowByGeneres(this.gID, this.page).pipe(map(mapToMovieDto));
    }
  }

  pageChanged(event: PaginatorState) {
    const pageNumber: number = event.page ? event.page + 1 : 1
    this.page = pageNumber
    console.log("pageChanged-----------------");

    this.loadShowItem()
    this.router.navigate(['/genres', this.showType, this.gID, this.page]);
  }
}

