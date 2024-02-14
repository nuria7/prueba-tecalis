import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGameTotalData } from '../models/IGameTotalData.model';
import { IGameResultsData } from '../models/IGameResultsData.model';
import { IGameInfoData } from '../models/IGameInfoData.model';
import { API_KEY } from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class GameStoreService {
  private baseUrl = 'https://rawg-video-games-database.p.rapidapi.com';

  constructor(private http: HttpClient) { }
  
  private setHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('x-rapidapi-host', 'rawg-video-games-database.p.rapidapi.com')
      .set('x-rapidapi-key', '45f632c4eemsh81a9c692e52deb7p18cd42jsn0cac7a27ace0');
  }

  /**
   * Get a list of game stores
   * @returns 
   */
  getGameStores(): Observable<IGameTotalData> {
    const url = `${this.baseUrl}/stores?key=${API_KEY}`;
    const headers = this.setHeaders();
    return this.http.get<IGameTotalData>(url, { headers });
  }

  /**
   * Get the details of each store
   * @param id 
   * @returns 
   */
  getStoreDetail(id: number): Observable<IGameResultsData> {
    const url = `${this.baseUrl}/stores/${id}?key=${API_KEY}`;
    const headers = this.setHeaders();
    return this.http.get<IGameResultsData>(url, { headers });
  }

  /**
   * Get the details of each game
   * @param id 
   * @returns 
   */
  getGameDetail(id: number): Observable<IGameInfoData> {
    const url = `${this.baseUrl}/games/${id}?key=${API_KEY}`;
    const headers = this.setHeaders();
    return this.http.get<IGameInfoData>(url, { headers });
  }
}
