import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Injectable, Input, NgZone, OnInit, Output } from "@angular/core";
import { CommonModule, NgClass } from "@angular/common";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CustomMultiselectComponent } from "../custom-multiselect/custom-multiselect.component";
import IServiceBase from "../../interfaces/IService";
import { DynamicFormValidationService } from "./ValidationServices";
import { DinamicFormControl } from "../../models/DinamicFormModel";

@Component({
  selector: "app-dynamic-form",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule, NgClass,
    CustomMultiselectComponent],
  templateUrl: "./dynamic-form.component.html",
  styleUrls: ["./dynamic-form.component.css"],
  providers: [DynamicFormValidationService],
  changeDetection: ChangeDetectionStrategy.Default,

})
export class DynamicFormComponent implements OnInit {
  @Input() withOnSubmit!: boolean;
  @Input() class!: string;
  @Input() service!: IServiceBase;
  @Input() serviceMethod!: string;
  @Input() formInputs: DinamicFormControl[] = [];
  selectedOptions: string[] = [];
  form!: FormGroup;
  maxLength!: Number;
  error!: boolean;
  companyLogoPath: any;


  constructor(
    private fb: FormBuilder,
    private validationService: DynamicFormValidationService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) { }

  ngOnInit(): void {
    this.buildForm();
    // Llamar a detectChanges después de construir el formulario
    this.cdr.detectChanges();
    // Observar los cambios en el formulario
    this.form.valueChanges.subscribe((value) => {
      this.zone.run(() => {
        // Iterar sobre todos los controles del formulario
        Object.keys(this.form.controls).forEach(controlName => {
          this.getErrorClasses(controlName);
        });
      });
    });
  }
  buildForm() {
    const formControls: { [key: string]: any } = {};
    for (const input of this.formInputs) {
      let father = this.formInputs.find(x => x.formControlName === input.dependencyFormControlName);
      const validators = this.validationService.applyValidation(input, father);
      formControls[input.formControlName] = [{ value: "", disabled: input.disable }, validators];
    }
    this.form = this.fb.group(formControls, { updateOn: 'blur' });
  }
  getErrorClasses(formControlName: string): string {
    const control = this.form.controls[formControlName];
    let classes = '';

    if (control.errors?.['required'] && !control.disabled) {
      if (!control.touched || (control.touched && !control.value)) {
        classes += ' has-warning';  // Orange when not touched or touched without any value
      }
      if (control.touched && !control.value) {
        classes += ' has-danger';  // Red when touched without any value
      }
    } else if (control.invalid && control.touched) {
      classes += ' has-danger'; // Set to red when the control is invalid and touched
    } else if (control.disabled) {
      classes += ' has-danger'; // Set to red when the control is disabled
    } else {
      classes += ' has-right';
    }
    return classes.trim();
  }
  getMaxLength(maxLength: number | undefined, dependencyFormControlName: string | undefined): number | null {
    if (dependencyFormControlName == null && maxLength != null) {
      return maxLength;
    } else {
      const input = this.formInputs.find(x => x.formControlName === dependencyFormControlName);
      if (input) {
        const controlValue = this.form.controls[input.formControlName].value;
        const matchingOption = input.options?.find((option: { id: any; }) => option.id === parseInt(controlValue));

        return matchingOption ? matchingOption.maxLength : null;
      } else {
        return null;
      }
    }
  }
  getMinLength(minLength: number | undefined, dependencyFormControlName: string | undefined): number | null {
    if (dependencyFormControlName == null && minLength != null) {
      return minLength;
    } else {
      const input = this.formInputs.find(x => x.formControlName === dependencyFormControlName);
      if (input) {
        const controlValue = this.form.controls[input.formControlName].value;
        const matchingOption = input.options?.find((option: { id: any; }) => option.id === parseInt(controlValue));
        return matchingOption ? matchingOption.minLength : null;
      } else {
        return null;
      }
    }
  }
  onSelectChange(input: DinamicFormControl, $event?: number): void {
    if (input.onChange) {
      let control = this.form.controls[input.formControlName];
      control.setValue($event);
      const inputFather = this.formInputs.find(x => x.dependencyFormControlName === input.formControlName);
      input.onChange(inputFather?.formControlName);
    }
  }
  onLoadInput(input: DinamicFormControl): void {
    if (input.event) {
      input.event(input);
    }
  }
  onKeyPress(input: DinamicFormControl, $event: KeyboardEvent) {
    if (input.keyPress) {
      if (input.dependencyFormControlName) {
        const inputFather = this.formInputs.find(x => x.formControlName === input.dependencyFormControlName);
        input.keyPress(input, inputFather, $event);
      } else {
        input.keyPress(input, $event);
      }
    }
  }
  onFileChange(input: DinamicFormControl, event: any) {
    const file = event.target.files[0];

    // Crear objeto URL para la imagen y asignarla al campo imageData
    input.imageData = URL.createObjectURL(file);


    this.form.controls[input.formControlName].setValue(file);
  }
  handleFileInput(input: DinamicFormControl, event: any) {
    const file = event.target.files[0];
    if (file) {
      // Realiza la lógica necesaria para cargar la imagen
      // Puedes usar FileReader para leer la imagen como base64
      const reader = new FileReader();
      reader.onload = (e: any) => {
        input.imageData = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  async onSubmit() {
    if (this.form.valid) {
      const serviceName = this.service;
      try {
        // Ejecutar el servicio y asignar errores si ocurren
        this.error = false; // Reiniciar errores antes de cada submit
        await this.service.execute(this.serviceMethod, this.form.value);
      } catch (error) {
        // Capturar errores y asignarlos a la propiedad errores
        this.error = true;
        console.error("Error:", error);
      }
    }
  }

}