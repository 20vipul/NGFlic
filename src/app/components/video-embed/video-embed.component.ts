import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-embed',
  templateUrl: './video-embed.component.html',
  styleUrl: './video-embed.component.css'
})
export class VideoEmbedComponent implements OnInit {
  @Input() key: string | null = null

  videoUrl: SafeResourceUrl = ''

  constructor(private senetizer: DomSanitizer) { }

  ngOnInit() {
    this.videoUrl = this.senetizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+this.key)
  }
}
