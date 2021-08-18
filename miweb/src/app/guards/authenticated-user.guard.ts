import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedUserGuard implements CanActivate {
  constructor(
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isValidToken = localStorage.getItem('token') != null && localStorage.getItem('token') !== '';

      if (isValidToken){
        return true;
      } else {
        Swal.fire('Acceso denegado', 'Inicie sesión para acceder a está página.', 'error');

        
        return false;
      }
  }

}
