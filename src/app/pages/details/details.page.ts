import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonBadge } from '@ionic/angular/standalone';
import { ActivatedRoute, RouterLink } from '@angular/router';


import { addIcons } from 'ionicons';
import { star } from 'ionicons/icons';
import { HeaderComponent } from '../layout/header/header.component';
import { ApiService } from 'src/app/services/api.service';
import { movieDto } from 'src/app/models/movie.dto';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, NgIf, IonImg, IonBadge, HeaderComponent]
})
export class DetailsPage implements OnInit {

  private activatedRoute = inject(ActivatedRoute);

  movie!: movieDto;
  slug!: string;
  stars!: Array<number>;

  constructor(private apiService: ApiService) {
    addIcons({ star });
  }

  ngOnInit() {

    /**
     * Get slug of movie.
     */
    this.activatedRoute.params.subscribe((params:any) => {
      this.slug = params.slug ? params.slug : '';
    });

    /**
     * Get movie by slug.
     */
    this.apiService.getMovies().subscribe(
      {
        next: (response:any) => {
          this.movie = response.movies.filter((movie:movieDto) => movie.slug == this.slug )[0];
          this.stars = Array(Math.round(this.movie?.imdb_rating/2)).fill(Math.round(this.movie?.imdb_rating/2));
        },
        error: (e) => console.error(e)
      }
    );


  }

}
