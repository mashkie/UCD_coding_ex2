import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Kindergarden } from '../../../shared/interfaces/Kindergarden';

@Component({
  selector: 'app-kindergarden-list',
  templateUrl: './kindergarden-list.component.html',
  styleUrls: ['./kindergarden-list.component.scss'],
})
export class KindergardenListComponent {
  @Input() kindergardens: Kindergarden[];
  @Output() navigatedToDetailView: EventEmitter<string> =
    new EventEmitter<string>();

  onNavigatedToDetails(id: string) {
    this.navigatedToDetailView.emit(id);
  }
}
