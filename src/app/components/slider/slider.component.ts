import { Component, Input, OnInit } from '@angular/core';
// import { MoviesService } from '../../services/movies.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { imageBaseUrl } from '../../constants/images_sizes';
import { Movie } from '../../types/movies';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
  animations : [
    trigger( 'slideFade', [
      state('void',style({opacity : 0})),
      transition('void <=> *',[animate('1s')] )
    ])
  ]
})

// export class SliderComponent implements OnInit {

//   movies: any;
//   constructor(private moviesService: MoviesService) { }

//   ngOnInit() {
//     // console.log("Hello From Slider componenet.");
//     this.getPopularMovies()
//   }

//   getPopularMovies() {
//     this.moviesService.getPopularMovies().subscribe(data => {
//       this.movies = data

//     })
//   }
// }

// The original code manually subscribes to the moviesService.getPopularMovies() observable inside 
// the getPopularMovies() method and assigns the resulting data to the 'movies' property. 
// However, this can be simplified by using Angular's async pipe, which automatically subscribes 
// to the observable in the template. This reduces the need to handle subscriptions manually 
// (and avoids memory leaks), making the code cleaner and more concise.

// Here's how the code can be improved:
// - In the TypeScript file, directly assign the observable from getPopularMovies() to a property.
// - In the template, use the async pipe to manage the subscription and display the data.

export class SliderComponent implements OnInit {

  @Input() slides : Movie[] = []
  @Input() isHeader = false
  // since we are usung @Input
  // constructor(private moviesService: MoviesService) { }
  // movies$ = this.moviesService.getPopularMovies();
  // movies$ = this.moviesService.getMoviesByType('popular',12);

  constructor() {}
  slideindex = 0;
  slideInterval : any ;
  imageBaseUrl = imageBaseUrl
  ngOnInit() {
    if(!this.isHeader){
      this.changeSlide()
    } 
  }

  changeSlide(){
    this.slideInterval  =setInterval(()=>{
      this.slideindex += 1
      if(this.slideindex > 10){
        clearInterval(this.slideInterval)
        this.slideindex = 0
        this.changeSlide()
      }
    },5000)
  }
}