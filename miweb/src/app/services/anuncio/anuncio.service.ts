import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import AUTH_SERVICIOS from 'src/app/config/urls';

@Injectable({
  providedIn: 'root'
})
export class AnuncioService {

  constructor(
    private http: HttpClient
  ) { }

  retrieveAdvertisements(): Promise<any>{
    const url = AUTH_SERVICIOS.anuncio;

    return this.http.get(url).toPromise();
  }
}
