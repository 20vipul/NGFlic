import { Component, Input } from '@angular/core';
import { Movie } from '../../types/movies'
import { imageBaseUrl } from '../../constants/images_sizes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrl: './show-item.component.css'
})
export class ShowItemComponent{
  @Input() showItem: Movie | null = null;
  @Input() ShowType: 'tv' | 'movie' = 'movie'
  imageBaseUrl = imageBaseUrl

 

  constructor(private router:Router){}

  // goToDetail(){
  //   this.router.navigate(['/detail',this.showItem?.id, this.ShowType])
  // }
}
