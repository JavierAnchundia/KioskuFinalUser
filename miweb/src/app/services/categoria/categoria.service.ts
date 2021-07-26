import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import AUTH_SERVICIOS from 'src/app/config/urls';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private http: HttpClient
  ) { }


  retrieveCategories(): Promise<any>{
    const url = AUTH_SERVICIOS.categorias;

    return this.http.get(url).toPromise();
  }
}
