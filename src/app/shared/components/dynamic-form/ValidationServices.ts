import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
export class DynamicFormValidationService {
  applyValidation(input: any, fatherInput: any): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    switch (input.type) {
      case 'select':
        if (input.required) {
          validators.push(Validators.required);
        }
        break;
      case 'password':
        if (input.dependencyFormControlName) {
          validators.push(Validators.required, this.passwordMatchValidator());
        } else {
          validators.push(Validators.required);
        }
        break;
      case 'email':
        validators.push(Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'));
        break;
      case 'text':
        validators.push(Validators.required);
        break;
      case 'file':
        validators.push(Validators.required);
        break;
      default:
        break;
    }
    return validators;
  }

  // Función de validación personalizada para verificar la confirmación de la contraseña
  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const password = control.get('txtPassword')?.value;
      const confirmPassword = control.get('txtPasswordVerification')?.value;

      if (password !== confirmPassword) {
        return { 'invalid': true };
      }

      return null;
    };
  }
}
