import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Kindergarden } from '../../../shared/interfaces/Kindergarden';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  @Input() kindergardens: Kindergarden[];
  @Output() filterSelected: EventEmitter<Kindergarden> =
    new EventEmitter<Kindergarden>();
  @Output() resetFilterValue: EventEmitter<void> = new EventEmitter<void>();
  selectedKindergarden: Kindergarden;

  applyFilter() {
    if (!this.selectedKindergarden) {
      return;
    }
    this.filterSelected.emit(this.selectedKindergarden);
  }

  resetFilter() {
    if (!this.selectedKindergarden) {
      return;
    }
    this.resetFilterValue.emit();
    this.selectedKindergarden = null;
  }
}
