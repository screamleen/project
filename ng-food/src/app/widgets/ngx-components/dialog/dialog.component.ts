import {
  Component, Input, Output, EventEmitter, Renderer,
  ElementRef, HostListener, OnInit, ViewEncapsulation, OnDestroy,
} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'ngx-dialog',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dialog.component.scss'],
  templateUrl: './dialog.component.html',
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
export class DialogComponent implements OnInit, OnDestroy {

  @Input() id: string;
  @Input() bgColor: string;
  @Input() visible: boolean;
  @Input() zIndex: number;
  @Input() title: string;
  @Input() content: string;
  @Input() template: any;
  @Input() cssClass: string;
  @Input() wrapPadding: string;
  @Input() context: any;
  @Input() closeOnBlur: boolean;
  @Input() closeOnEscape: boolean;
  @Input() closeButton: boolean ;
  @Input() cancelButton: boolean;
  @Input() okButton: boolean ;
  @Input() okText: string;
  @Input() cancelText: string;
  @Input() logo: {
    url?: string,
    height?: number,
    width?: number,
  };
  @Input() data: any;
  @Input() overlayStyle: any;

  @Output() open = new EventEmitter();
  @Output() close = new EventEmitter();
  @Output() ok = new EventEmitter();
  @Output() cancel = new EventEmitter();

  get contentzIndex(): number {
    return this.zIndex + 1;
  }

  get visibleState(): string {
    return this.visible ? 'active' : 'inactive';
  }

  constructor(private element: ElementRef, private renderer: Renderer) {
  }

  ngOnInit(): void {
    if (this.visible) {
      this.show();
    }
  }

  show(): void {
    this.visible = true;

    setTimeout(() => {
      this.renderer.invokeElementMethod(
        this.element.nativeElement, 'focus', []);
    }, 10); // tslint:disable-line

    this.open.emit();
  }

  @HostListener('keydown.esc')
  onKeyDown(): void {
    if (this.closeOnEscape) {
      this.hide();
    }
  }

  hide(): void {
    this.visible = false;
    this.close.emit();
  }

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target): void {
    if (this.containsTarget(target)) {
      this.hide();
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

  containsTarget(target): boolean {
    return this.closeOnBlur &&
      target.classList.contains('dialog');
  }

  /**
   * On destroy callback
   *
   * @memberOf DrawerComponent
   */
  ngOnDestroy() {
    this.close.emit(true);
  }

}
