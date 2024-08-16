import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { ISearchResult } from '../shared/interfaces/ISearchResult';
import { BaseService } from './BaseService';

@Injectable({
  providedIn: 'root',
})

export class GetRowsService extends BaseService {


  constructor(private _http: HttpClient) {
    super();
  }

  getDataRows(params: any): Observable<ISearchResult> {
    // Configuración de encabezados
    let headers = new HttpHeaders()
      .append('Authorization', 'Bearer ' + this.getToken)
      .append('Content-Type', 'application/json');

    // Configuración de parámetros HTTP
    let httpParams = new HttpParams()
      .set('Skip', (params.page - 1) * params.pageSize)
      .set('Take', params.pageSize)
      .set('SortColumn', params.sortColumn)
      .set('SortDirection', params.sortDirection)
      .set('MemberId', this.getMember);

    // Agregar el término de búsqueda si está presente
    if (params.searchTerm) {
      httpParams = httpParams.set('Search', params.searchTerm);
    }

    // Realizar la solicitud HTTP GET
    return this._http.get<ISearchResult>(`${this.API_URL}${params.url}`, {
      headers: headers,
      params: httpParams,
    }).pipe(
      tap(response => {
        console.log('Respuesta de la solicitud:', response);  // Agregamos un console.log para la respuesta
      }),
      map(response => ({
        rows: response.rows,  // Asumiendo que la respuesta tiene una propiedad 'rows'
        total: response.total  // Asumiendo que la respuesta tiene una propiedad 'total'
      }))
    );
  }

}

