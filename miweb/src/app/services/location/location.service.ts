import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import AUTH_SERVICIOS from 'src/app/config/urls';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private http: HttpClient,
  ) { }


  retrieveCities(id: string): Promise<any>{
    const url = AUTH_SERVICIOS.ciudad + id + '/';

    return this.http.get(url).toPromise();
  }

  retrieveProvinces(): Promise<any>{
    const url = AUTH_SERVICIOS.provincia;

    return this.http.get(url).toPromise();
  }
}
