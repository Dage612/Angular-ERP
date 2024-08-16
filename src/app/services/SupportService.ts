import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { BaseService } from './BaseService';
import Swal from 'sweetalert2';
import UbiCountry from '../shared/models/UbicationModels/UbiCountryModel';

@Injectable({
    providedIn: 'root',
})
export class SupportService extends BaseService {
    constructor(private http: HttpClient) {
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

}
