import { Component, Input, Output, EventEmitter, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DialogComponent } from '../dialog.component';

/* tslint:disable */
@Component({
  selector: 'ngx-alert-dialog',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    '../dialog.component.scss',
    './alert.component.scss',
  ],
  templateUrl: 'alert.component.html',
  animations: [
    trigger('visibilityTransition', [
      state('active', style({
        opacity: 1,
        transform: 'scale3d(1, 1, 1)',
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'scale3d(1.2, 1.2, 1.2)',
        }),
        animate('0.2s ease-out'),
      ]),
      transition('* => inactive', [
        style({
          opacity: 1,
          transform: 'scale3d(1, 1, 1)',
        }),
        animate('0.2s ease-out', style({
          transform: 'scale3d(0.9, 0.9, 1)',
          opacity: 0,
        })),
      ]),
    ]),
  ],
  host: { // tslint:disable-line
    tabindex: '-1',
  },
})
export class AlertComponent extends DialogComponent implements OnInit {

  defaults: any = {
    inputs: {
      zIndex: 991,
      closeOnBlur: false,
      closeOnEscape: false,
      closeButton: false,
      showOverlay: true,
      visible: true,
    },
  };

  @Input() type: any;
  @Input() data: any;
  @Output() ok = new EventEmitter();
  @Output() cancel = new EventEmitter();

  @ViewChild('dialogContent') dialogElm;

  ngOnInit(): void {
    if (this.type !== 'prompt') {
      this.dialogElm.nativeElement.focus();
    }
  }

  onOkClick(): void {
    this.ok.emit({data: this.data});
    this.hide();
  }

  onCancelClick(): void {
    this.cancel.emit({data: this.data});
    this.hide();
  }

  onKeydown(): void {
    this.ok.emit({data: this.data});
    this.hide();
  }

}
