import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  protected API_URL = environment.apiUrl;

  constructor() { }

  handleError(error: HttpErrorResponse | Error | string): Observable<never> {
    let errMsg: string;

    if (typeof error === 'string') {
      errMsg = error;
    } else if (error instanceof HttpErrorResponse) {
      // Caso de errores HTTP
      if (error.status === 400) {
        if (error.error && typeof error.error === 'object') {
          errMsg = error.error.error || 'Error desconocido';
        } else if (typeof error.error === 'string') {
          errMsg = error.error;
        } else {
          errMsg = 'Solicitud incorrecta';
        }
      } else {
        errMsg = `Error ${error.status}: ${error.statusText}`;
      }
    } else {
      errMsg = (error instanceof Error) ? error.message : "Error desconocido";
    }

    // Muestra el error al usuario usando SweetAlert2
    Swal.fire({
      icon: 'error', // Icono de error
      title: "Oops...",
      text: errMsg,
      confirmButtonColor: '#CC1819',
      footer: '<a href="#">Contacte a support@syscorpla.net</a>'
    });

    return throwError(() => new Error(errMsg));
  }


  public header() {
    let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    return header;
  }

  get headers() {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  public headerToken() {
    let header = new HttpHeaders();
    header = header.append('Authorization', 'Bearer ' + this.getToken);
    return header;
  }
  public jsonHeader() {
    let header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json');
    header = header.append('Authorization', 'Bearer ' + this.getToken);
    return header;
  }

  public formHeader() {
    const token = this.getToken;
    if (typeof token !== 'string') {
      throw new Error('Token no es una cadena válida');
    }

    let headers = new HttpHeaders({
      //This it's not necessary if method to backend had FromForm
      // 'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + token
    });
    return headers;
  }

  get formHeaderWithFile() {
    return new HttpHeaders({ 'Content-Type': 'multipart/form-data' });
  }
  get getToken() {
    try {
      return JSON.parse(localStorage.getItem('account')!).token;
    } catch (error) {
      error = "Token Inválido";
      this.handleError(error);
    }
  }

  get getMember(): number {
    return parseFloat(JSON.parse(localStorage.getItem('account')!).memberId);
  }
  get getUserId(): string {
    return JSON.parse(localStorage.getItem('account')!).userId;
  }
}
