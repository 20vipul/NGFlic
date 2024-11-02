import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { SliderComponent } from './components/slider/slider.component';
import { HttpClientModule } from '@angular/common/http';
import { MoviesService } from './services/movies.service';
import { TvshowsService } from './services/tvshows.service';
import { BannerComponent } from './components/banner/banner.component';
import { ShowItemComponent } from './components/show-item/show-item.component';
import { ShowDetailComponent } from './pages/show-detail/show-detail.component';
import { VideoEmbedComponent } from './components/video-embed/video-embed.component';
import { ShowsListComponent } from './pages/shows-list/shows-list.component';
import { GeneresComponent } from './pages/generes/generes.component';
import { TabViewModule } from 'primeng/tabview';
import { ImageModule } from 'primeng/image';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';



@NgModule({
  // This array is used to declare components, directives, and pipes that belong to this module.
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SliderComponent,
    BannerComponent,
    ShowItemComponent,
    ShowDetailComponent,
    VideoEmbedComponent,
    ShowsListComponent,
    GeneresComponent,
  ],
  /**
   * This array is used to import other Angular modules that your current module depends on.
   * BrowserModule: This is required for any Angular application running in a browser, as it provides essential services like DOM rendering, sanitization, etc.
   * AppRoutingModule: This is your custom routing module, which defines the routing configuration for your app.
   * HttpClientModule: This module is imported so you can use the HttpClient service to make HTTP requests in your app.
   */
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TabViewModule,
    ImageModule,
    CarouselModule,
    InputTextModule,
    FormsModule,
    PaginatorModule,
  ],
  exports:[],
  /**
   *  This array is where you register services that should be available for dependency injection throughout the module or application
   * By listing MoviesService in providers, you tell Angular that it should create and manage an instance of this service and make it available to be injected into other components * or services
   */
  providers: [MoviesService, TvshowsService],
  /**
   * The bootstrap array usually contains a single component, and in most cases, it is AppComponent, which is the root component of the application. This is the component Angular * * renders first when it starts the app
   */
  bootstrap: [AppComponent]
})
export class AppModule { }
