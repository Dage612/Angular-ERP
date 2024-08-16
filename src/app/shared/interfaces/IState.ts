import { SortColumn, SortDirection } from "../components/table/sortable/sortable.directive";


export interface IState {
	url: string
	page: number;
	pageSize: number;
	searchTerm: string;
	sortColumn: SortColumn;
	sortDirection: SortDirection;
}