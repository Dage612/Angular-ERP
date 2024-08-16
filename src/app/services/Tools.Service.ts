import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./BaseService";
import Swal from "sweetalert2";
import IServiceBase from "../shared/interfaces/IService";
import UbiProvince from "../shared/models/UbicationModels/UbiProvinceModel";
import { Observable, catchError, tap } from "rxjs";
import { UbiDistrict } from "../shared/models/UbicationModels/UbiDistrictModel";
import UbiCanton from "../shared/models/UbicationModels/UbiCantonModel";
import { UbiCity } from "../shared/models/UbicationModels/UbiCityModel";
import { SelectBaseControl } from "../shared/models/SelectBaseModel";
import { ExChangeRate } from "../shared/models/ExChangeRateModel";
import UbiCountry from "../shared/models/UbicationModels/UbiCountryModel";
import { CompanyType } from "../shared/models/CompanyModels/CompanyTypeModel";


@Injectable({
    providedIn: 'root'
})
export default class ToolsService extends BaseService implements IServiceBase {
    constructor(private _http: HttpClient) {
        super();
    }
    execute(methodName: string, object: object): Promise<any> {
        return new Promise((resolve, reject) => {
            const method = this.constructor.prototype[methodName];
            // Asegurarse de que el método existe y es una función
            if (typeof method === 'function') {
                const boundMethod = method.bind(this);
                if (object != null) {
                    boundMethod(object).subscribe(
                        (data: any) => {
                            Swal.fire({
                                icon: "success",
                                title: 'Éxito!',
                                text: 'Registro exitoso',
                                heightAuto: false,
                                confirmButtonColor: '#CC1819'
                            });
                            resolve(data); // Resuelve la Promesa con los datos del observable
                        },
                        (error: any) => {
                            reject(error); // Rechaza la Promesa con el error del observable
                        }
                    );
                } else {
                    boundMethod();
                    resolve(null); // Resuelve la Promesa si no se proporciona un objeto
                }
            } else {
                const errorMessage = `El método '${methodName}' no existe en ${this.constructor.name}.`;
                console.error(errorMessage);
                reject(new Error(errorMessage)); // Rechaza la Promesa con un nuevo error
            }
        });
    }
    getCountries(): Observable<UbiCountry[]> {
        return this._http.get<UbiCountry[]>(this.API_URL + '/api/Tools/GetCountries', { headers: this.jsonHeader() })
            .pipe(
                tap(result => {
                }),
                catchError(this.handleError)
            );
    }
    getProvinces(countryId: number): Observable<UbiProvince[]> {
        let _params = new HttpParams();
        _params = _params.append("countryId", countryId);
        return this._http.get<UbiProvince[]>(this.API_URL + '/api/Tools/GetProvinces',
            { headers: this.jsonHeader(), params: _params })
            .pipe(
                tap(result => {
                }),
                catchError(this.handleError)
            );
    }
    getCantons(provinceId: number): Observable<UbiCanton[]> {
        let _params = new HttpParams();
        _params = _params.append("provinceId", provinceId)
        return this._http.get<UbiCanton[]>(this.API_URL + '/api/Tools/GetCantons',
            { headers: this.jsonHeader(), params: _params }).
            pipe(
                tap(result => {
                }),
                catchError(this.handleError)
            );
    }
    getDistricts(provinceId: number, cantonId: number): Observable<UbiDistrict[]> {
        let params = new HttpParams()
            .set('provinceId', provinceId)
            .set('cantonId', cantonId);

        return this._http.get<UbiDistrict[]>(this.API_URL + '/api/Tools/GetDistricts', {
            headers: this.jsonHeader(),
            params: params
        }).pipe(
            tap(result => {
            }),
            catchError(this.handleError)
        );
    }
    getCities(provinceId: number, cantonId: number, districtId: number): Observable<UbiCity[]> {
        let params = new HttpParams()
            .set('provinceId', provinceId)
            .set('cantonId', cantonId)
            .set('districtId', districtId);
        return this._http.get<UbiCity[]>(this.API_URL + '/api/Tools/GetCities', {
            headers: this.jsonHeader(),
            params: params
        }).pipe(
            tap(result => {
            }),
            catchError(this.handleError)
        );
    }
    getIdentificationTypes(): Observable<SelectBaseControl[]> {
        return this._http.get<SelectBaseControl[]>(this.API_URL + '/api/Tools/GetIdentificationTypes', { headers: this.jsonHeader() })
            .pipe(
                tap(result => {

                }),
                catchError(this.handleError)
            );
    }
    getExchangeRates(): Observable<ExChangeRate[]> {
        return this._http.get<ExChangeRate[]>(this.API_URL + '/api/Tools/GetExchangeRate', { headers: this.jsonHeader() }).
            pipe(
                tap(result => {
                }),
                catchError(this.handleError)
            );

    }
    getCompanyTypes(): Observable<CompanyType[]> {
        return this._http.get<CompanyType[]>(this.API_URL + '/api/Tools/GetCompanyTypes', { headers: this.jsonHeader() }).
            pipe(
                tap(result => {
                }),
                catchError(this.handleError)
            );
    }
    getIdentificationTypesAnonymous(): Observable<SelectBaseControl[]> {
        return this._http.get<SelectBaseControl[]>(this.API_URL + '/api/Tools/GetIdentificationTypesAnonymous', { headers: this.header() })
            .pipe(
                tap(result => {

                }),
                catchError(this.handleError)
            );
    }
}



