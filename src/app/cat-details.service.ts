import { Cat } from './interfaces/cat';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class CatDetailsService {
  url: string = `http://localhost:3000/petfinder`;

  constructor(private http: HttpClient) {}

  getCats = () => {
    return this.http.get(this.url);
  };

  getCatForId = (catId: number) => {
    return this.http.get<Cat>(`${this.url}/${catId}`);
  };

  getCatsForBreed = (breedName: string) => {
    return this.http.get(this.url, {
      params: {
        breed: breedName,
      },
    });
  };
}
