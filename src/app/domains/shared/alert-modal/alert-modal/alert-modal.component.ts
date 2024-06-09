import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  standalone: true,
  imports: [],
  templateUrl: './alert-modal.component.html',
  styleUrl: './alert-modal.component.css'
})
export class AlertModalComponent {

  @Input() error: string | null = null;
  @Output() close = new EventEmitter<void>();

  onCloseClick() {
    this.close.emit();
  }

}
