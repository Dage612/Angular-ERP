import { SortColumn, SortDirection } from "../components/table/sortable/sortable.directive";


export class ITable {
  url: string = '';
  data: Params[] = [];
  columns: Column[] = [];
  headerControl: HeaderControl[] = [];
  changeDesign: any;
  pageSize: number = 6;
  page: number = 1;
  searchTerm: string | undefined;
  sortColumn: SortColumn | undefined;
  sortDirection: SortDirection | undefined;
  constructor(init?: Partial<ITable>) {
    Object.assign(this, init);
  }

  addParams(name: string, value: string): void {
    const newData: Params = new Params();
    newData.name = name;
    newData.value = value;

    this.data.push(newData);
  }

  removeParams(name: string): void {
    this.data = this.data.filter((param) => param.name !== name);
  }

  addColumns(cols: Column[]): void {
    this.columns = cols;
  }
}

export class Params {
  name: string | undefined;
  value: string | undefined;

  constructor(init?: Partial<Params>) {
    Object.assign(this, init);
  }
}

export class HeaderControl {
  id: string | undefined;
  controlName: string | undefined;
  // controlValues?: CustomerTypes[];
  // controlType: ControlTypesEnum;
  onClick?: () => void;
  delete?: () => void;
  options?: any[];

  constructor(init?: Partial<HeaderControl>) {
    Object.assign(this, init);
  }
}

export class Column {
  name?: string;
  field?: string | undefined;
  align?: string;
  innerHtml?: string;
  isSortTable: boolean = true;
  onClickRow?: () => void;
  pipe: string = 'N/A';
  formatPipe?: string;
  inputs?: InputValue;
  highlight: boolean = true;

  constructor(init?: Partial<Column>) {
    Object.assign(this, init);
  }
}

export class InputValue {
  id: string = 'inputData';
  type: string | undefined;
  max?: number;
  min?: number;
  class?: string = 'form-control';
  value?: string;
  placeholder?: string = 'Ingresar dato';
  checked?: boolean;
  onChange?: () => void;
  innerHtml?: string;

  constructor(init?: Partial<InputValue>) {
    Object.assign(this, init);
  }
}
