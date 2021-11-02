import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header d-flex justify-content-center">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  `
})

export class NgbdModalContent {

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, OnDestroy {

  private modalRef;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.modalRef = this.modalService.open(NgbdModalContent);
  }

  ngOnDestroy(): void {
    this.modalRef.close();
  }


}
