import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ModalService } from '../../shared/components/modal/modal/modal.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { SecurityService } from '../../services/SecurityService';
import { IResetPassword } from '../../shared/interfaces/IResetPassword';


@Component({
  selector: 'app-restore-password',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, FormsModule],
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css']
})
export default class RestorePasswordComponent implements OnInit {

  restoreCode!: string | null;
  checkPassword: string = '';
  password: string = '';
  faUnlockKeyhole = faUnlockKeyhole;

  constructor(private route: ActivatedRoute, private modalService: ModalService, private securityService: SecurityService, private router: Router) { }

  ngOnInit(): void {
    this.restoreCode = this.route.snapshot.paramMap.get('code');

  }
  closeModal() {
    this.modalService.closeActiveModal();
  }
  resetPassword() {
    const isFieldIncomplete = this.password.trim() === '' || this.checkPassword.trim() === '';

    if (isFieldIncomplete) {
      this.showAlert('warning', '¡Atención!', 'Un campo está incompleto. Intente de nuevo.');
    } else if (this.password !== this.checkPassword) {
      this.showAlert('warning', '¡Atención!', 'Las contraseñas no coinciden. Intente de nuevo.');
    } else {
      const resetPassword: IResetPassword = {
        code: this.restoreCode,
        password: this.password
      };

      this.securityService.resetPassword(resetPassword).subscribe((data: boolean) => {
        if (data) {
          this.showAlert('success', 'Éxito!', 'Registro exitoso');
          this.router.navigate(['/login'], { relativeTo: this.route });
        } else {
          this.showAlert('warning', '¡Atención!', 'Se produjo un error, vuelva a generar un código.');
        }
      });
    }
  }

  private showAlert(icon: SweetAlertIcon, title: string, text: string) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      heightAuto: false,
      confirmButtonColor: '#CC1819'
    });
  }



}
