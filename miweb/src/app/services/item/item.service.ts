import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import AUTH_SERVICIOS from 'src/app/config/urls';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private http: HttpClient
  ) { }

  createItem (item: any): Promise<any> {
    const url = AUTH_SERVICIOS.item;
    return this.http.post<any>(url, item).toPromise();
  }

  retrieveItemsByUser(id: string): Promise<any>{
    const url = AUTH_SERVICIOS.itemsByUser + id + '/';

    return this.http.get(url).toPromise();
  }

  deleteItem(id: string): Promise<any>{
    const url = AUTH_SERVICIOS.item + id + '/';

    return this.http.delete(url).toPromise();
  }

  editItem(id: string, item: any): Promise<any>{
    const url = AUTH_SERVICIOS.item + id + '/';

    return this.http.put(url, item).toPromise();
  }

}
