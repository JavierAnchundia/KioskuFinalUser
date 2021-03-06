import { Injectable } from '@angular/core';
import AUTH_SERVICIOS from 'src/app/config/urls';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagenProductoService {

  constructor(
    private http: HttpClient,
  ) { }

  retrieveImagesByProduct(id: string): Promise<any>{
    const url = AUTH_SERVICIOS.img_producto + id +'/';

    return this.http.get(url).toPromise();
  }
}
