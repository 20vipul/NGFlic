import { Component, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../types/movies';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {

  @Input() shows: Movie[] = []
  @Input() title: string = "";
  @Input() showsType: 'tv' | 'movie' = 'movie'

}
