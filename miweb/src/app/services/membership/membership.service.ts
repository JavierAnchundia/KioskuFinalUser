import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import AUTH_SERVICIOS from 'src/app/config/urls';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  constructor(
    private http: HttpClient,
  ) { }

  retrieveMemberships(): Promise<any> {
    const url = AUTH_SERVICIOS.membresia;

    return this.http.get(url).toPromise();
  }
  
}
