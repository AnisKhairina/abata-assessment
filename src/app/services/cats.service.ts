import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResult} from 'src/app/services/interfaces';

const BASE_URL = 'https://catfact.ninja/breeds';

@Injectable({
  providedIn: 'root'
})
export class CatsService {
  private http = inject(HttpClient);

  constructor() { }

  getCats(page = 1): Observable<ApiResult>{ 
    return this.http.get<ApiResult>(`${BASE_URL}?page=${page}`);
  }

  getCatsDetails() {}
}
