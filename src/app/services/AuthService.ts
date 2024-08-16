import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { BaseService } from './BaseService';
import { IAccountInfo } from '../shared/interfaces/IAccountInfo';
import { IAuth } from '../shared/interfaces/IAuth';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(private http: HttpClient, private router: Router) {
    super();
  }

  public login(auth: IAuth): Observable<IAccountInfo> {
    return this.http
      .post<IAccountInfo>(this.API_URL + '/api/Auth/Login', JSON.stringify(auth), { headers: this.header() })
      .pipe(catchError(this.handleError));
  }

  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  setLocalStorage(data: IAccountInfo): void {
    if (data != null) {
      localStorage.setItem('account', JSON.stringify(data));
      console.log(JSON.parse(localStorage.getItem('account')!).memberId);
    }
  }

  logOut(): void {
    localStorage.clear();
  }

  static canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authService = inject(BaseService);
    const router = inject(Router);
    // Si el usuario está autenticado, permitir el acceso
    if (authService.getToken) {
      return true;
    } else {
      // Si no está autenticado y la URL no es '/login', redirigir a '/login'
      return state.url.startsWith('/login') ? true : router.createUrlTree(['/login']);
    }
  }

  get IsSupport(): boolean {
    const accountData = localStorage.getItem('account');
    const account = accountData ? JSON.parse(accountData) : null;
    return account?.isSupport ?? false;
  }
}
