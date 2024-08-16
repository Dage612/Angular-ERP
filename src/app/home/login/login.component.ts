import { CommonModule } from '@angular/common';
import { Component, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/AuthService';
import { ModalService } from '../../shared/components/modal/modal/modal.service';
import { IAuth } from '../../shared/interfaces/IAuth';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'modal-login',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})
export default class LoginComponent {
  faCoffee = faCoffee;
  userEmail: string = '';
  password: string = '';
  constructor(private modalService: ModalService, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }

  Login() {
    if (this.userEmail.trim() == "" || this.password.trim() == "") {
      Swal.fire({
        icon: "warning",
        title: '¡Atención!',
        text: 'Se ha presentado un inconveniente: Hace falta completar los campos',
        heightAuto: false,
        confirmButtonColor: '#CC1819'
      });
    } else {
      let auth: IAuth = {
        userEmail: this.userEmail,
        password: this.password
      };

      if (auth) {
        this.authService.login(auth).subscribe(
          data => {
            if (data.withoutCompany) {
              this.modalService.closeActiveModal();
              this.router.navigate(['/main/modules']);
              this.authService.setLocalStorage(data);
            } else {
              this.modalService.closeActiveModal();
              this.router.navigate(['/main/company']);
              this.authService.setLocalStorage(data);
            }
          },
          error => {
            // Manejar errores aquí
          }
        );
      }
    }
  }
  recoverPassword(email: string) {
    this.router.navigate(['/recover'], {
      relativeTo: this.activatedRoute,
      queryParams: { email }
    });
  }
  closeModal() {
    this.modalService.closeActiveModal();
  }
}
