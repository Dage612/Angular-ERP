import { ChangeDetectionStrategy, Component, Input, OnInit, QueryList, ViewChildren } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { NgbHighlight, NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbdSortableHeader, SortEvent } from "./sortable/sortable.directive";
import { FormsModule } from "@angular/forms";
import { ITable } from "../../interfaces/ITable";
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { TableService } from "../../../services/TableService";
import { GetRowsService } from "../../../services/GetRowsService";


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [DecimalPipe, FormsModule, NgbHighlight, NgbPaginationModule, AsyncPipe, NgbdSortableHeader],
  templateUrl: './table.component.html',
  providers: [TableService, DecimalPipe, GetRowsService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {
  @Input() data: ITable = new ITable();
  data$: Observable<any[]>;
  total$: Observable<number>;
  loading$: Observable<boolean>;
  searchTerm: string = '';
  pageSize: number = 6;
  page: number = 1;
  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;
  public _loading$ = new BehaviorSubject<boolean>(true);

  constructor(private service: TableService) {
    this.data$ = service.data$;
    this.total$ = service.total$;
    this.loading$ = this._loading$;
  }

  ngOnInit(): void {
    this.service.page = this.page;
    this.service.pageSize = this.pageSize;
    this.service.url = this.data.url;
    // Llama a fetchData inmediatamente después de crear el componente
    this.fetchData();
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;

    // Llama a fetchData después de ordenar
    this.fetchData();
  }

  onPageChange(page: number) {
    this.service.page = page;
    this.fetchData();
  }

  onPageSizeChange() {
    // Aquí asignas el valor de pageSize al servicio, pero asegúrate de que sea un número.
    this.service.pageSize = this.pageSize;
    this.fetchData();
  }

  fetchData(): void {
    // Asegúrate de que searchTerm se haya actualizado antes de llamar a _getDataRows
    this.service.searchTerm = this.searchTerm;
    // Set _loading$ to true before making the API call
    this._loading$.next(true);
    this.service._getDataRows().subscribe(result => {
      console.log('Data fetched:', result);
      // Cambiaré _data$ por next directo en service
      this.service._data$.next(result.rows);
      this.service._total$.next(result.total);
      // Oculta el mensaje de "Loading..."
      this._loading$.next(false);
    });
  }
}
