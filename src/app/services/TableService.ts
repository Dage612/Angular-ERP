import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { catchError, debounceTime, delay, map, switchMap, tap } from 'rxjs/operators';
import { GetRowsService } from './GetRowsService';
import { IState } from '../shared/interfaces/IState';
import { ISearchResult } from '../shared/interfaces/ISearchResult';
import { SortColumn, SortDirection } from '../shared/components/table/sortable/sortable.directive';
@Injectable({
  providedIn: 'root',
})
export class TableService {
  public _loading$ = new BehaviorSubject<boolean>(true);
  public _search$ = new Subject<void>();
  public _data$ = new BehaviorSubject<any[]>([]);
  public _total$ = new BehaviorSubject<number>(0);

  private _state: IState = {
    page: 3,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
    url: '',
  };

  constructor(private dataService: GetRowsService) {

  }

  get data$(): Observable<any[]> {
    return this._data$.asObservable();
  }

  get total$(): Observable<number> {
    return this._total$.asObservable();
  }

  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  get page(): number {
    return this._state.page;
  }

  get pageSize(): number {
    return this._state.pageSize;
  }

  get searchTerm(): string {
    return this._state.searchTerm;
  }

  get url(): string {
    return this._state.url;
  }

  set page(page: number) {
    this._set({ page });
  }

  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }

  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }

  set sortColumn(sortColumn: SortColumn) {
    this._set({ sortColumn });
  }

  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  set url(url: string) {
    this._set({ url });
  }

  private _set(patch: Partial<IState>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  public _getDataRows(): Observable<ISearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm, url } = this._state;

    const params = {
      page,
      pageSize,
      sortColumn,
      sortDirection,
      searchTerm,
      url,
    };

    // Ensure that params is not empty
    if (!params || Object.keys(params).length === 0) {
      console.error('Params cannot be empty');
      return of({ rows: [], total: 0 });
    }

    return this.dataService.getDataRows(params).pipe(
      tap(result => {
        console.log('Data successfully fetched:', result);
      }),
      catchError(error => {
        console.error('Error fetching data:', error);
        return of({ rows: [], total: 0 });
      })
    );
  }
}
