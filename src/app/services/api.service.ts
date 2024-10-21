import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /**
   * Get movies with optional param.
   * @param term term of search
   */
  getMovies(term?:string) {
    let data = '';
    if(term) data = `?q=${term}`
    return this.httpClient.get<any>(`${environment.api}/movies${data}`, this.httpOptions)
  }

}
