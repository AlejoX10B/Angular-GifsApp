import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Gif, SearchGIFResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _limit: number = 10;
  private _history: string[] = [];
  private _apiKey: string = 'UeI8XjVOvJQOj20Fovli3vZbqH1mqxWK';

  public results: Gif[] = [];

  get history(): string[] {
    return [...this._history];
  }

  constructor(private http: HttpClient) {
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
  }

  searchGifs(query: string) {

    query = query.trim().toLowerCase();

    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0, 10);

      localStorage.setItem('history', JSON.stringify(this._history));
    }

    this.http.get<SearchGIFResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this._apiKey}&limit=${this._limit}&q=${query}`)
      .subscribe(resp => {
        this.results = resp.data;
      });

    console.log(this._history);
  }
}
