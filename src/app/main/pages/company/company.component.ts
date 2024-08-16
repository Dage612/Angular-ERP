import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveTabService } from '../../../shared/components/section-tabs/section-tabs-service.component';
import { SectionTabsComponent } from '../../../shared/components/section-tabs/section-tabs.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, faSquareEnvelope, faTextSlash, faUnlockKeyhole, faUserLarge } from '@fortawesome/free-solid-svg-icons';
import { DinamicFormControl } from '../../../shared/models/DinamicFormModel';
import { SidemenuComponent } from '../../../shared/components/sidemenu/sidemenu.component';
import { DynamicFormStepsComponent } from '../../../shared/components/dynamic-form-steps/dynamic-form-steps.component';
import { Step } from '../../../shared/interfaces/IStep';
import ToolsService from '../../../services/Tools.Service';
import { catchError, of, tap } from 'rxjs';
import CompanyService from '../../../services/CompanyService';
import { TableComponent } from '../../../shared/components/table/table.component';
import { TableService } from '../../../services/TableService';
import { Column, ITable } from '../../../shared/interfaces/ITable';


@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, DynamicFormStepsComponent, SectionTabsComponent, FontAwesomeModule, SidemenuComponent,
    TableComponent],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css',
  providers: [ActiveTabService, ToolsService, CompanyService, TableService]
})

export default class CompanyComponent implements OnInit {

  faCoffee = faCoffee;
  faUserLarge = faUserLarge;
  faUnlockKeyhole = faUnlockKeyhole;
  faSquareEnvelope = faSquareEnvelope;
  faTextSlash = faTextSlash;
  dynamicTabs!: any[];
  steps!: Step[];
  customerInputsForm!: DinamicFormControl[];
  country!: number;
  pronvince!: number;
  canton!: number;
  district!: number;
  token: string = '';
  grupo: string = '';
  tableData: ITable = new ITable();

  @ViewChild(DynamicFormStepsComponent) dynamicFormComponent!: DynamicFormStepsComponent;
  constructor(public activeTabService: ActiveTabService, public toolsService: ToolsService, public companyService: CompanyService) {
  }
  ngOnInit() {
    this.init();
  }
  init() {
    this.steps = [
      { stepNumber: 1, description: 'Logo de la Compañía', class: 'col-12 text-center' },
      { stepNumber: 2, description: 'Datos de la Compañía', class: 'col-12 col-sm-6 col-md-3' },
      { stepNumber: 3, description: 'Comunicación de la Compañía', class: 'col-12 col-sm-6 col-md-6' },
    ];
    this.dynamicTabs = [
      { title: 'Registrar', content: 'tab1-content' },
      { title: 'Listar', content: 'tab2-content' },
    ];
    this.customerInputsForm = [
      new DinamicFormControl({
        type: 'file',
        formControlName: 'fileImage',
        label: 'Adjuntar Imagen',
        icon: faUserLarge,
        alertMessage: '',
        stepForm: 1,
      }),
      new DinamicFormControl({
        type: 'text',
        formControlName: 'txtName',
        required: true,
        placeholder: "Nombre de la compañia",
        label: 'Compañía',
        icon: faUserLarge,
        alertMessage: '',
        stepForm: 2,
      }),
      new DinamicFormControl({
        type: 'select',
        required: true,
        formControlName: 'txtTypeId',
        label: 'Tipo de Identificación',
        options: [],
        multiple: false,
        design: 'select',
        icon: faUserLarge,
        alertMessage: 'Seleccione el tipo',
        onChange: this.activeInput.bind(this),
        stepForm: 2,
      }),
      new DinamicFormControl({
        type: 'text',
        formControlName: 'txtId',
        required: true,
        label: 'Identificación',
        placeholder: 'Identificación',
        icon: faUserLarge,
        alertMessage: '',
        dependencyFormControlName: 'txtTypeId',
        disable: true,
        keyPress: this.restrictNumeric.bind(this),
        stepForm: 2,
      }),
      new DinamicFormControl({
        type: 'select',
        required: true,
        formControlName: 'slTypeCompanyId',
        label: 'Tipo de Compañia',
        options: [],
        multiple: false,
        design: 'select',
        icon: faUserLarge,
        alertMessage: 'Seleccione el tipo',
        // onChange: this.activeInput.bind(this),
        stepForm: 2,
      }),
      new DinamicFormControl({
        type: 'select',
        required: true,
        formControlName: 'slCurrency',
        label: 'Moneda',
        options: [],
        multiple: false,
        design: 'select',
        icon: faUserLarge,
        alertMessage: 'Seleccione el tipo',
        stepForm: 2,
      }),
      new DinamicFormControl({
        type: 'text',
        required: true,
        formControlName: 'txtSocialReason',
        label: 'Razón Social',
        placeholder: 'Razón Social',
        icon: faUserLarge,
        alertMessage: '',
        stepForm: 2,
      }),
      new DinamicFormControl({
        type: 'select',
        required: true,
        formControlName: 'txtCountry',
        label: 'País',
        options: [],
        multiple: false,
        design: 'select',
        icon: faUserLarge,
        onChange: this.loadProvinces.bind(this),
        stepForm: 2,
      }),
      new DinamicFormControl({
        type: 'select',
        formControlName: 'txtProvince',
        dependencyFormControlName: 'txtCountry',
        label: 'Provincia',
        options: [],
        multiple: false,
        design: 'select',
        icon: faUserLarge,
        onChange: this.loadCantos.bind(this),
        stepForm: 2,
      }),
      new DinamicFormControl({
        type: 'select',
        formControlName: 'txtCanton',
        dependencyFormControlName: 'txtProvince',
        label: 'Cantón',
        options: [],
        multiple: false,
        design: 'select',
        icon: faUserLarge,
        onChange: this.loadDistricts.bind(this),
        stepForm: 2,
      }),
      new DinamicFormControl({
        type: 'select',
        formControlName: 'txtDistrict',
        dependencyFormControlName: 'txtCanton',
        label: 'Distrito',
        options: [],
        multiple: false,
        design: 'select',
        icon: faUserLarge,
        onChange: this.loadCities.bind(this),
        stepForm: 2,
      }),
      new DinamicFormControl({
        type: 'select',
        formControlName: 'txtCity',
        dependencyFormControlName: 'txtDistrict',
        label: 'Ciudad',
        options: [],
        multiple: false,
        design: 'select',
        icon: faUserLarge,
        stepForm: 2,
      }),
      new DinamicFormControl({
        type: 'text',
        formControlName: 'txtAddress',
        required: true,
        label: 'Dirección',
        placeholder: 'Dirección',
        icon: faUserLarge,
        alertMessage: '',
        stepForm: 2,
      }),
      new DinamicFormControl({
        type: 'text',
        formControlName: 'txtContactName',
        label: 'Contacto',
        placeholder: 'Nombre Contacto',
        icon: faUserLarge,
        alertMessage: '',
        stepForm: 3,
        required: true,
      }),
      new DinamicFormControl({
        type: 'email',
        formControlName: 'txtContactEmail',
        label: 'Correo',
        placeholder: 'Email',
        icon: faUserLarge,
        alertMessage: '',
        stepForm: 3,
        required: true,
      }),
      new DinamicFormControl({
        type: 'number',
        formControlName: 'numTelephone',
        label: 'Teléfono',
        placeholder: 'Teléfono',
        icon: faUserLarge,
        alertMessage: '',
        stepForm: 3,
      }),
      new DinamicFormControl({
        type: 'number',
        formControlName: 'numCelphone',
        label: 'Celular',
        placeholder: 'Celular',
        icon: faUserLarge,
        alertMessage: '',
        stepForm: 3,
      }),
      new DinamicFormControl({
        type: 'text',
        formControlName: 'txtPostalCode',
        label: 'Código Postal',
        placeholder: 'Código Postal',
        icon: faUserLarge,
        alertMessage: '',
        stepForm: 3,
        required: true,
      }),
      new DinamicFormControl({
        type: 'text',
        formControlName: 'txtComment',
        label: 'Comentario',
        placeholder: 'Comentario',
        icon: faUserLarge,
        alertMessage: '',
        stepForm: 3,
      }),
    ];
    this.toolsService.getCountries()
      .pipe(
        tap((countries) => {
          const input = this.dynamicFormComponent.formInputs.find((control) => control.formControlName === 'txtCountry');
          countries.forEach((country) => input?.options.push({ id: country.id, description: country.description }));
        }),
        catchError(() => of(null))
      ).
      subscribe();
    this.toolsService.getIdentificationTypes()
      .pipe(
        tap((identifications) => {
          const input = this.dynamicFormComponent.formInputs.find((control) => control.formControlName === 'txtTypeId')
          identifications.forEach((identification) => input?.options.push({
            id: identification.id, description: identification.description,
            maxLength: identification.maxLength, minLength: identification.minLength, withLyrics: identification.withLyrics
          }));
        }),
        catchError(() => of(null))
      ).subscribe();
    this.toolsService.getExchangeRates().
      pipe(
        tap((rates) => {
          const input = this.dynamicFormComponent.formInputs.find((control) => control.formControlName === 'slCurrency')
          rates.forEach((rate) => input?.options.push({ id: rate.id, description: rate.description }));
        }),
        catchError(() => of(null))
      ).subscribe();
    this.toolsService.getCompanyTypes().
      pipe(
        tap((companyTypes) => {
          const input = this.dynamicFormComponent.formInputs.find((control) => control.formControlName === 'slTypeCompanyId')
          companyTypes.forEach((companyType) => input?.options.push({ id: companyType.id, description: companyType.description }));
        }),
        catchError(() => of(null))
      ).subscribe();
    this.tableData.url = "/api/Company/GetCompanies";
    this.tableData.addColumns([
      new Column({ name: "Nombre", field: "name" }),
      new Column({ name: "Description", field: "identification" }),
    ]);


  }
  restrictNumeric(input: DinamicFormControl, inputFather: DinamicFormControl, e: KeyboardEvent) {
    if (input.dependencyFormControlName) {
      let control = this.dynamicFormComponent.form.controls[input.dependencyFormControlName].value;
      const matchingOption = inputFather.options?.find((option: { id: any; }) => option.id === parseInt(control));
      if (!matchingOption?.withLyrics) {
        const inputValue = e.key;
        const numericRegex = /^[0-9]*$/;
        if (!numericRegex.test(inputValue)) {
          e.preventDefault();
        }
      }
    }
  }
  activeInput(value: any) {
    this.dynamicFormComponent.form.controls[value].enable();
  }
  async loadProvinces(value: any) {
    const input = this.dynamicFormComponent.formInputs.find((control) => control.formControlName === value);
    // This code for clear all select's when country select change
    const controlNames = ['txtCity', 'txtDistrict', 'txtProvince', 'txtProvince', 'txtCanton'];
    controlNames.forEach(controlName => {
      // Busca el control correspondiente en `this.dynamicFormComponent.formInputs`
      const control = this.dynamicFormComponent.formInputs.find(input => input.formControlName === controlName);

      // Si se encuentra el control
      if (control) {
        // Limpiar las opciones del control (suponiendo que tiene una propiedad `options`)
        control.options = null;
      }
    });
    input.options = [];
    const inputFather = this.dynamicFormComponent.formInputs.find(x => x.formControlName === input?.dependencyFormControlName);
    if (inputFather) {
      this.country = parseInt(this.dynamicFormComponent.form.controls[inputFather.formControlName].value);
      this.toolsService.getProvinces(this.country).
        pipe(
          tap((provinces) => {
            provinces.forEach((province) => input?.options.push({ id: province.id, description: province.description }));
          }),
          catchError(() => (null))
        ).subscribe()
    } else {
      console.error("No se encontró un padre válido para el valor proporcionado.");
    }
  }
  async loadCantos(value: any) {
    const input = this.dynamicFormComponent.formInputs.find((control) => control.formControlName === value);
    input.options = [];
    const inputFather = this.dynamicFormComponent.formInputs.find(x => x.formControlName === input?.dependencyFormControlName);
    if (inputFather) {
      this.pronvince = parseInt(this.dynamicFormComponent.form.controls[inputFather.formControlName].value);
      this.toolsService.getCantons(this.pronvince).
        pipe(
          tap((cantons) => {
            cantons.forEach((canton) => input?.options.push({ id: canton.id, description: canton.description }));
          }),
          catchError(() => (null))
        ).subscribe()
    }

  }
  async loadDistricts(value: any) {
    const input = this.dynamicFormComponent.formInputs.find((control) => control.formControlName === value);
    input.options = [];
    const inputFather = this.dynamicFormComponent.formInputs.find(x => x.formControlName === input?.dependencyFormControlName);
    this.canton = parseInt(this.dynamicFormComponent.form.controls[inputFather.formControlName].value);
    this.toolsService.getDistricts(this.pronvince, this.canton).
      pipe(
        tap((districts) => {
          districts.forEach((district) => input?.options.push({ id: district.id, description: district.description }));
        }),
        catchError(() => (null))
      ).subscribe()
  }
  async loadCities(value: any) {
    const input = this.dynamicFormComponent.formInputs.find((control) => control.formControlName === value);
    input.options = [];
    const inputFather = this.dynamicFormComponent.formInputs.find(x => x.formControlName === input?.dependencyFormControlName);
    this.district = parseInt(this.dynamicFormComponent.form.controls[inputFather.formControlName].value);
    this.toolsService.getCities(this.pronvince, this.canton, this.district).pipe
      (tap((cities) => {
        cities.forEach((city) => input.options.push({ id: city.id, description: city.description }));
      }), catchError(() => (null))
      ).subscribe()
  }
  changeTab(index: number): void {
    this.activeTabService.changeTab(index);
  }

}
