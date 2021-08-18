import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import AUTH_SERVICIOS from 'src/app/config/urls';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  constructor(
    private http: HttpClient
  ) { }

  retrieveHistorial(id: string): Promise<any>{
    const url = AUTH_SERVICIOS.historial + id + '/';

    return this.http.get(url).toPromise();
  }

  retrieveOrderDetail(id: string): Promise<any> {
    const url = AUTH_SERVICIOS.orderDetail + id + '/';

    return this.http.get<any>(url).toPromise();
  }
}
