import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import AUTH_SERVICIOS from 'src/app/config/urls';

@Injectable({
  providedIn: 'root'
})
export class EstadoItemService {

  constructor(
    private http: HttpClient
  ) { }

  createEstado (estado: any): Promise<any> {
    const url = AUTH_SERVICIOS.estadoItem;
    return this.http.post<any>(url, estado).toPromise();
  }
}
