import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  template: ""
})
export class ModalComponent implements OnInit, OnDestroy {
  @ViewChild('content', { read: ElementRef }) content: ElementRef | undefined;

  private modalRef: NgbModalRef | null = null;

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.modalService.modalOpen$.subscribe(() => {
      this.openModal();
    });
  }

  openModal() {
    if (this.content) {
      this.modalRef = this.modalService.openModal(this.content.nativeElement);
    }
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  ngOnDestroy() {
    if (this.modalRef) {
      this.modalRef.componentInstance.modalComponent.destroy();
    }
  }
}
