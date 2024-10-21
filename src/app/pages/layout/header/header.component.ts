import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';
import { IonHeader, IonSearchbar, IonGrid, IonRow, IonCol, IonButton, IonLabel, IonRouterLink } from '@ionic/angular/standalone';
import { movieDto } from 'src/app/models/movie.dto';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonHeader, IonSearchbar, IonGrid, IonRow, IonCol, IonButton, IonLabel, IonRouterLink],
})
export class HeaderComponent {

  @Input() moviesByFilter: movieDto[] = [];
  @Output() termSearch:EventEmitter<any> = new EventEmitter<any>();
  @Output() clearFilter:EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  /**
   * Set term search.
   */
  onSearch(data:any) {
    this.termSearch.emit(data.detail.value);
  }

  /**
   * Clear search input.
   */
  onClear(event:any) {
    this.moviesByFilter = [];
    this.clearFilter.emit(event);
  }

}
