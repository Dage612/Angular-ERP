import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { faSquareEnvelope, faUnlockKeyhole, faUserLarge } from '@fortawesome/free-solid-svg-icons';
import MemberService from '../../services/MemberService';
import { DinamicFormControl } from '../../shared/models/DinamicFormModel';
import { SelectBaseControl } from '../../shared/models/SelectBaseModel';
import { ModalService } from '../../shared/components/modal/modal/modal.service';
import { DynamicFormComponent } from '../../shared/components/dynamic-form/dynamic-form.component';
import { IdentificationTypes } from '../../shared/interfaces/lIdentificationTypes';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import ToolsService from '../../services/Tools.Service';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [DynamicFormComponent, ReactiveFormsModule],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.css',
  providers: [ToolsService]

})
export class SingUpComponent implements OnInit {

  dataTypes: IdentificationTypes | undefined;
  singUpInputsForm!: DinamicFormControl[];
  @ViewChild(DynamicFormComponent) dynamicFormComponent!: DynamicFormComponent;

  constructor(private modalService: ModalService, public memberService: MemberService,
    private cdr: ChangeDetectorRef, public toolsService: ToolsService) {
  }
  ngOnInit(): void {
    this.init();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  closeModal() {
    this.modalService.closeActiveModal();
  }
  init() {
    this.singUpInputsForm = [
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
        onChange: this.activeInput.bind(this)
      }),
      new DinamicFormControl({
        type: 'text',
        formControlName: 'txtId',
        label: 'Identificación',
        icon: faUserLarge,
        alertMessage: '',
        dependencyFormControlName: 'txtTypeId',
        disable: true,
        keyPress: this.restrictNumeric.bind(this)

      }),
      new DinamicFormControl({
        type: 'text',
        formControlName: 'txtName',
        label: 'Nick Name',
        icon: faUserLarge,
        alertMessage: ''
      }),
      new DinamicFormControl({
        type: 'email',
        formControlName: 'txtEmail',
        label: 'Correo',
        icon: faSquareEnvelope,
        alertMessage: ''
      }),
      new DinamicFormControl({
        type: 'password',
        formControlName: 'txtPassword',
        label: 'Contraseña',
        icon: faUnlockKeyhole,
        alertMessage: ''

      }),
      new DinamicFormControl({
        type: 'password',
        formControlName: 'txtPasswordVerification',
        label: 'Verificar Contraseña',
        icon: faUnlockKeyhole,
        alertMessage: '',
        dependencyFormControlName: 'txtPassword',
        event: this.verifyPassword.bind(this)

      }),
    ];
    this.toolsService.getIdentificationTypesAnonymous()
      .pipe(
        tap((identifications: any[]) => {
          const input = this.dynamicFormComponent.formInputs.find((control) => control.formControlName === 'txtTypeId')
          identifications.forEach((identification) => input?.options.push({
            id: identification.id, description: identification.description,
            maxLength: identification.maxLength, minLength: identification.minLength, withLyrics: identification.withLyrics
          }));
        }),
        catchError(() => of(null))
      ).subscribe();
  }

  activeInput(value: any) {
    this.dynamicFormComponent.form.controls[value].enable();
  }
  verifyPassword(input: DinamicFormControl): void {
    const passwordVerifyControl = this.dynamicFormComponent.form.controls[input.formControlName];
    const passwordControl = this.dynamicFormComponent.form.controls[input.dependencyFormControlName];
    const passwordVerify = passwordVerifyControl.value;
    const password = passwordControl.value;
    if (passwordVerify !== password) {
      this.dynamicFormComponent.form.controls[input.formControlName].setErrors({ invalid: true });
    }
  }
  restrictNumeric(input: DinamicFormControl, inputFather: DinamicFormControl, e: KeyboardEvent) {
    if (input.dependencyFormControlName) {
      let control = this.dynamicFormComponent.form.controls[input.dependencyFormControlName].value;
      const matchingOption = inputFather.options?.find((option: { Id: any; }) => option.Id === parseInt(control));
      if (!matchingOption?.WithLyrics) {
        const inputValue = e.key;
        const numericRegex = /^[0-9]*$/;
        if (!numericRegex.test(inputValue)) {
          e.preventDefault();
        }
      }
    }
  }
  get getFormStatus(): boolean {
    return this.dynamicFormComponent?.form?.valid || false;
  }
  get getForm(): FormGroup {
    return this.dynamicFormComponent?.form;
  }
  async submitForm() {
    try {
      await this.dynamicFormComponent.onSubmit();
      if (this.dynamicFormComponent.error) {

      } else {
        // Lógica adicional si la operación fue exitosa
        this.modalService.closeActiveModal();
      }
    } catch (error) {
      // Lógica para manejar errores si es necesario
      console.error("Error:", error);
    }
  }
}
