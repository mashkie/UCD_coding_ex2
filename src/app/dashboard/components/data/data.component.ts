import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { StoreService } from 'src/app/shared/services/store.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Kindergarden } from '../../../shared/interfaces/Kindergarden';
import { SortEvent } from '../../../shared/interfaces/SortEvent';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() currentPage!: number;
  @Input() pageSize!: number;
  @Input() pageCount!: number;
  @Input() sortValues!: SortEvent;
  @Input() isLoading!: boolean;

  @Output() selectPageEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() canceledEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() sortedEvent: EventEmitter<SortEvent> =
    new EventEmitter<SortEvent>();
  @Output() filterEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() resetFilterEvent: EventEmitter<void> = new EventEmitter<void>();

  pageEvent: PageEvent;
  pageIndex = 0;
  data: any[] = [];

  displayedColumns: string[] = [
    'name',
    'kindergarden',
    'address',
    'age',
    'birthday',
    'registeredDate',
    'cancel',
  ];

  constructor(public storeService: StoreService) {}

  getAge(birthDate: string) {
    const today = new Date();
    const birthDateTimestamp = new Date(birthDate);
    let age = today.getFullYear() - birthDateTimestamp.getFullYear();
    const m = today.getMonth() - birthDateTimestamp.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateTimestamp.getDate())) {
      age--;
    }
    return age;
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.selectPageEvent.emit(e.pageIndex + 1);
  }

  public cancelRegistration(childId: string) {
    this.canceledEvent.emit(childId);
  }

  ngAfterViewInit() {
    if (!this.isLoading) {
      this.sort.sortChange.subscribe(({ active, direction }) => {
        this.paginator.pageIndex = 0;
        this.selectPageEvent.emit(1);
        this.sortedEvent.emit({
          active: active === 'kindergarden' ? 'kindergardenId' : active,
          direction,
        });
      });
    }
  }

  onFilterSelected(kindergarden: Kindergarden) {
    this.paginator.pageIndex = 0;
    this.selectPageEvent.emit(1);
    this.filterEvent.emit(kindergarden.id.toString());
  }

  onResetFilter() {
    this.paginator.pageIndex = 0;
    this.selectPageEvent.emit(1);
    this.resetFilterEvent.emit();
  }
}
