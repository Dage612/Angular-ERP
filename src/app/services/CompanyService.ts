import Swal from "sweetalert2";
import { BaseService } from "./BaseService";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import IServiceBase from "../shared/interfaces/IService";
import { catchError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export default class CompanyService extends BaseService implements IServiceBase {
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
    saveCompany(companyData: any) {
        console.log(JSON.parse(localStorage.getItem('account')!).memberId);
        const formData = new FormData();
        formData.append('name', companyData.txtName);
        formData.append('identificationTypeId', "" + parseInt(companyData.txtTypeId));
        formData.append('memberId', "" + this.getMember);
        formData.append('identification', companyData.txtId);
        formData.append('companyTypeId', '' + parseInt(companyData.slTypeCompanyId));
        formData.append('exchangeRateId', '' + parseInt(companyData.slCurrency));
        formData.append('socialReason', companyData.txtSocialReason);
        formData.append('countryId', '' + parseInt(companyData.txtCountry));
        formData.append('provinceId', '' + parseInt(companyData.txtProvince));
        formData.append('cantonId', '' + parseInt(companyData.txtCanton));
        formData.append('districtId', '' + parseInt(companyData.txtDistrict));
        formData.append('cityId', '' + parseInt(companyData.txtCity));
        formData.append('address', companyData.txtAddress);
        formData.append('contactName', companyData.txtContactName);
        formData.append('contactEmail', companyData.txtContactEmail);
        formData.append('telephone', companyData.numTelephone);
        formData.append('phone', companyData.numCelphone);
        formData.append('postalCode', companyData.txtPostalCode);
        formData.append('comment', companyData.txtComment);
        if (companyData.fileImage != null) {
            formData.append('img', companyData.fileImage);
        }

        return this._http.post(this.API_URL + "/api/Company/SaveCompany", formData, {
            headers: this.formHeader(),
        })
            .pipe(
                catchError(this.handleError)
            );
    }

}

