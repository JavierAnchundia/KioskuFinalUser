import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import AUTH_SERVICIOS from 'src/app/config/urls';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(
    private http: HttpClient,
  ) { }

  retrieveMostRecent(): Promise<any>{
    const url = AUTH_SERVICIOS.mostRecent;

    return this.http.get(url).toPromise();
  }

  retrieveProductsByCat(id: string): Promise<any>{
    const url = AUTH_SERVICIOS.productsByCat + id +'/';

    return this.http.get(url).toPromise();
  }

  retrieveProductsBySubcat(id: string): Promise<any>{
    const url = AUTH_SERVICIOS.productsBySubcat + id +'/';

    return this.http.get(url).toPromise();
  }

  retrieveProductById(id: string): Promise<any>{
    const url = AUTH_SERVICIOS.producto + id + '/';

    return this.http.get(url).toPromise();
  }

  retrieveRecentProductByCat(): Promise<any>{
    const url = AUTH_SERVICIOS.recentProductsByCat;

    return this.http.get(url).toPromise();
  }


}
