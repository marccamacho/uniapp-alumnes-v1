import { Injectable } from '@angular/core';
import { StorageService }       from './storage.service';
import { ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storage: StorageService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // mirem si ens envien el token per url
    if (route.queryParams['token'] !== undefined) {
      this.storage.setToken(route.queryParams['token']);
      const decoded = this.storage.decodeToken(route.queryParams['token']);
      this.storage.setItem('edu360-user',         JSON.stringify(decoded.payload['user']));
      this.storage.setItem('edu360-personLogged', JSON.stringify(decoded.payload['person']));
      this.storage.setItem('edu360-werpRoles', JSON.stringify(decoded.payload['werpRoles']));
      this.storage.setItem('edu360-laboralManagerSchools', JSON.stringify(decoded.payload['laboralManagerSchools']));

      this.router.navigate([], {queryParams: {token: null}, queryParamsHandling: 'merge'}); //esborrem el token de la url
    }

    // Es comprova si no hi ha token desat al Localstorage per a redirigir al Login
    if (localStorage.getItem('edu360-token') === undefined || localStorage.getItem('edu360-token') === null ) {
      const continueString = 'http://' + environment.loginHost + '?continue=' + window.location.href.split('#')[0] ;
      window.location.href = continueString + '%2F%23%2F'  ;
      return true;
    } else {

      // hem de mirar si el token existent ja ha expirat
      const current_time = Date.now() / 1000;
      const decoded = this.storage.getDecodedToken()
      if ( decoded != null && decoded.exp < current_time) {
          this.storage.clear();
          alert('Sessió caducada.');
          window.location.href = 'http://' + environment.loginHost + '?continue=' + window.location.href.split('#')[0] + '%2F%23%2F';
          return true;
        }
      // si hem arribat aquí és que tot està en ordre.
      return true;
    }
  }
}