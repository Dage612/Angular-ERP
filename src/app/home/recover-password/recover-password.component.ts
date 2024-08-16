import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from '../../shared/components/modal/modal/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SecurityService } from '../../services/SecurityService';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.css'
})
export default class RecoverPasswordComponent {
  faCoffee = faCoffee;
  userEmail: string = '';
  password: string = '';
  constructor(private modalService: ModalService, private securityService: SecurityService, private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userEmail = params['email'];
    });
  }
  generateCode() {
    this.modalService.closeActiveModal();
    if (this.userEmail.trim() == "") {
      Swal.fire({
        icon: "warning",
        title: '¡Atención!',
        text: 'Se ha presentado un inconveniente: Hace falta completar los campos',
        heightAuto: false,
        confirmButtonColor: '#CC1819'
      });
    } else {
      this.securityService.generateCode(this.userEmail).subscribe((data: boolean) => {
        if (data) {
          Swal.fire({
            icon: "success",
            title: 'Éxito!',
            text: 'Por favor, revise su correo para restablecer la contraseña',
            heightAuto: false,
          });
        }
      })
    }
  }
  closeModal() {
    this.modalService.closeActiveModal();
  }
}
