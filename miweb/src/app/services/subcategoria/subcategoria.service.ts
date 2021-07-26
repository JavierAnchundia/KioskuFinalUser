import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import AUTH_SERVICIOS from 'src/app/config/urls';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {

  constructor(
    private http: HttpClient
  ) { }

  retrieveSubcategoriesByCat(id: string): Promise<any>{
    const url = AUTH_SERVICIOS.subcatByCat + id + '/';

    return this.http.get(url).toPromise();
  }
}
