import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  /**
   * Get token.
   */
  getToken() {
    const token = 'Wookie2021';
    return token;
  }
}
