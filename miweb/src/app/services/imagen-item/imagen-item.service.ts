import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import AUTH_SERVICIOS from 'src/app/config/urls';

@Injectable({
  providedIn: 'root'
})
export class ImagenItemService {
  private httpOptions: any;

  constructor(
    private http: HttpClient
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: '',
      })
    };
   }

  createImagenItem (img_item: any): Promise<any> {
    const url = AUTH_SERVICIOS.img_item;
    return this.http.post<any>(url, img_item).toPromise();
  }
}
