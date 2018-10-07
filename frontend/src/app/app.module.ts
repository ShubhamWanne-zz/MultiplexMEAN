import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MultiplexMovieComponent } from './multiplex-movie/multiplex-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    MultiplexMovieComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
