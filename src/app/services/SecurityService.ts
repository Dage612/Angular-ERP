import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { BaseService } from './BaseService';
import { IResetPassword } from '../shared/interfaces/IResetPassword';

@Injectable({
    providedIn: 'root',
})
export class SecurityService extends BaseService {
    constructor(private http: HttpClient) {
        super();
    }
    generateCode(email: string) {
        return this.http.post<any>(this.API_URL + '/api/Security/GenerateCode', JSON.stringify(email), {
            headers: this.header()
        }).pipe(catchError(this.handleError));
    }
    resetPassword(reset: IResetPassword) {
        return this.http.post<any>(this.API_URL + '/api/Security/ResetPassword', JSON.stringify(reset), {
            headers: this.header()
        }).pipe(catchError(this.handleError));
    }
}
