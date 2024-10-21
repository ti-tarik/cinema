import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonLabel, IonRouterLink } from '@ionic/angular/standalone';
import { NgFor, NgIf } from '@angular/common';

import { addIcons } from 'ionicons';
import { arrowForwardOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../layout/header/header.component';
import { ApiService } from 'src/app/services/api.service';
import { movieDto } from 'src/app/models/movie.dto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonLabel, IonRouterLink, NgFor, NgIf, RouterLink, HeaderComponent],
})
export class HomePage implements OnInit {

  movies: Array<movieDto[]> = [];
  genres: any[] = [];
  moviesByFilter: movieDto[] = [];

  constructor(private apiService: ApiService) {
    addIcons({ arrowForwardOutline });
  }

  ngOnInit() {
    this.getMovies();
  }

  /**
   * Get movies and group by gendre.
   */
  getMovies() {
    this.apiService.getMovies().subscribe(
      {
        next: (response:any) => {
          console.log(response)
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

  /**
   * Set term search and get movies.
   */
  onSearch(term:string) {
    if(term == '') return this.moviesByFilter = [];

    this.apiService.getMovies(term).subscribe(
      {
        next: (response:any) => {
          this.moviesByFilter = response.movies;
        },
        error: (e) => console.error(e)
      }
    )
    return;
  }

  onClear(event:any) {
    if(event) this.moviesByFilter = [];
  }

}
