import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import IServiceBase from "../shared/interfaces/IService";
import { BaseService } from "./BaseService";
import { MemberModel } from "../shared/models/MemberModel";
import Swal from "sweetalert2";
import { Observable, catchError, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export default class MemberService extends BaseService implements IServiceBase {
    constructor(private _http: HttpClient) {
        super();
    }
    execute(methodName: string, object: object | null): Promise<any> {
        return new Promise((resolve, reject) => {
            const method = this.constructor.prototype[methodName];

            if (typeof method === 'function') {  // Verifica si el método existe
                const boundMethod = method.bind(this);

                if (object !== null) {
                    // Si el objeto no es null, suscríbete a la respuesta
                    boundMethod(object).subscribe(
                        (data: any) => {
                            Swal.fire({
                                icon: 'success',
                                title: '¡Éxito!',
                                text: 'Operación exitosa',
                                heightAuto: false,
                                confirmButtonColor: '#CC1819',
                            });
                            resolve(data);
                        },
                        (error: any) => {
                            reject(error);
                        }
                    );
                } else {
                    // Si el objeto es null, intenta llamar al método y suscribirse a la respuesta
                    try {
                        const result = boundMethod();  // Llama al método sin argumentos
                        if (result && typeof result.subscribe === 'function') {  // Verifica si es un Observable
                            result.subscribe(
                                (data: any) => {
                                    resolve(data);
                                },
                                (error: any) => {
                                    console.error('Error en boundMethod():', error);
                                    reject(error);  // Manejo de errores
                                }
                            );
                        } else {
                            resolve(result);  // Para métodos que no son Observables
                        }
                    } catch (error) {
                        // Manejo de errores si la llamada al método falla
                        reject(error);
                    }
                }
            } else {
                const errorMessage = `El método '${methodName}' no existe en ${this.constructor.name}.`;
                reject(new Error(errorMessage));  // Rechaza la promesa con un error significativo
            }
        });
    }
    saveMember(memberData: any) {
        let member: MemberModel = {
            id: 0,
            typeId: parseInt(memberData.txtTypeId),
            identification: memberData.txtId,
            name: memberData.txtName,
            email: memberData.txtEmail,
            telephone: "86446568",
            active: false,
            password: memberData.txtPassword,
            userModel: null
        };
        return this._http.post<any>(`${this.API_URL}/api/Member/SaveMember`, JSON.stringify(member), {
            headers: this.header(),
        }).pipe(
            catchError(this.handleError)
        );
    }
    getMembers(): Observable<MemberModel[]> {
        return this._http.get<any[]>(`${this.API_URL}/api/Member/GetMembers`, { headers: this.jsonHeader() })
            .pipe(
                tap(result => {
                }),
                catchError(this.handleError)
            );
    }
    getMembersToApprove(): Observable<MemberModel[]> {
        return this._http.get<any[]>(`${this.API_URL}/api/Member/getMembersToApprove`, { headers: this.jsonHeader() })
            .pipe(
                tap(result => {
                }),
                catchError(this.handleError)
            );
    }
    approveMemberAndUser(data: any): Observable<any> {
        const id = parseFloat(data.id);
        return this._http.post<any>(
            `${this.API_URL}/api/Member/approveMemberAndUser`,
            id,
            {
                headers: this.jsonHeader(),
            }
        ).pipe(
            catchError(this.handleError)
        );
    }

}
