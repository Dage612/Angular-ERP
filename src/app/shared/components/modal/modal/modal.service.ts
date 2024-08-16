// modal.service.ts

import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalOpenSubject = new Subject<void>();
  modalOpen$ = this.modalOpenSubject.asObservable();
  constructor(private modalService: NgbModal) { }
  openModal(component: any): NgbModalRef {
    const modalRef = this.modalService.open(component, { centered: true });
    this.modalOpenSubject.next();
    return modalRef;
  }

  closeActiveModal() {
    this.modalService.dismissAll();
  }
}
