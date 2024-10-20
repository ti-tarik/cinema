import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonGrid, IonRow, IonCol, IonButton, IonLabel, IonRouterLink } from '@ionic/angular/standalone';
import { ApiService } from '../api.service';
import { movieDto } from '../models/movie.dto';
import { NgFor } from '@angular/common';

import { addIcons } from 'ionicons';
import { arrowForwardOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonGrid, IonRow, IonCol, IonButton, IonLabel, IonRouterLink, NgFor,RouterLink],
})
export class HomePage implements OnInit {

  movies: Array<movieDto[]> = [];
  genres: any[] = [];

  constructor(private apiService: ApiService) {
    addIcons({ arrowForwardOutline });
  }

  ngOnInit() {
    this.apiService.getMovies().subscribe(
      {
        next: (response:any) => {
          response.movies.filter((movie:movieDto) => {
            for (const genre of movie.genres) {
              if(!this.genres.includes(genre))
                this.genres.push(genre)
            }
          })
          this.genres = this.genres.sort()

          response.movies.map((movie:movieDto) => {
            let i = 0
            for (const genre of this.genres) {
                if (!this.movies[i]) {
                  this.movies[i] = [];
                }
                if(movie.genres.includes(genre)){
                  let movieByGenre:movieDto = {genre: genre, ...movie}
                  this.movies[i].push(movieByGenre)
              }
              i++
            }
          })
        },
        error: (e) => console.error(e)
      }
    );
  }

}
