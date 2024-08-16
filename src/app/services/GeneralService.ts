import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./BaseService";
import { CompanyModules } from "../shared/models/CompanyModels/CompanyModulesModel";
import { Observable, catchError, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export default class GeneralService extends BaseService {
    constructor(private _http: HttpClient) {
        super();
    }
    getCompanyModules(): Observable<CompanyModules[]> {
        return this._http.get<CompanyModules[]>(this.API_URL + '/api/General/GetCompanyModules', { headers: this.jsonHeader() })
            .pipe(
                tap(result => {
                }),
                catchError(this.handleError)
            );
    }
}



