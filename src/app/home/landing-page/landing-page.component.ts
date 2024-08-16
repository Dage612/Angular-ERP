import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SingUpComponent } from '../sing-up/sing-up.component';
import MemberService from '../../services/MemberService';
import { ModalService } from '../../shared/components/modal/modal/modal.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterModule, SingUpComponent],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  providers: [MemberService]
})
export default class homeComponent {
  sessionInit: boolean | false | undefined;

  constructor(private modalService: ModalService, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  getYear(): number {
    return new Date().getFullYear();
  }
  LogInModal() {
    this.sessionInit = true;
    this.router.navigate(['./login'], { relativeTo: this.activatedRoute });
  }
  SingUpModal() {
    this.modalService.openModal(SingUpComponent);
  }
}
