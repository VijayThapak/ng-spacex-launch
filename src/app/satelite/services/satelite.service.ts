import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'https://api.spaceXdata.com/v3/launches?limit=100';

@Injectable({
  providedIn: 'root'
})
export class SateliteService {

  constructor(private http : HttpClient) { }

  getSatelites(queryStr: string): Observable<any> {
    return this.http.get(BASE_URL+ queryStr);
  }

}
