import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Kindergarden, Typ } from '../../../shared/interfaces/Kindergarden';

@Component({
  selector: 'app-kindergarden-item',
  templateUrl: './kindergarden-item.component.html',
  styleUrls: ['./kindergarden-item.component.scss'],
})
export class KindergardenItemComponent {
  @Input() kindergarden: Kindergarden;
  @Output() navigatedToDetailView: EventEmitter<string> =
    new EventEmitter<string>();

  navigateToDetailView(id: number) {
    this.navigatedToDetailView.emit(id.toString());
  }

  protected readonly Typ = Typ;
}
