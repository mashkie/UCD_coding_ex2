import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { BackendService } from 'src/app/shared/services/backend.service';
import { CHILDREN_PER_PAGE } from 'src/app/shared/constants';
import { StoreService } from 'src/app/shared/services/store.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import {
  catchError,
  map,
  merge,
  of,
  startWith,
  Subscription,
  switchMap,
} from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { Kindergarden } from '../../../shared/interfaces/Kindergarden';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() currentPage!: number;
  @Output() selectPageEvent = new EventEmitter<number>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'name',
    'kindergarden',
    'address',
    'age',
    'birthday',
    'cancel',
  ];
  pageEvent: PageEvent;
  length: number = 0;
  pageSize: number = CHILDREN_PER_PAGE;
  pageIndex = 0;
  subscription: Subscription = new Subscription();
  isLoadingResults: boolean;
  data: any[] = [];
  resultsLength = 0;

  constructor(
    public storeService: StoreService,
    private backendService: BackendService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.backendService.getChildren(this.currentPage);
    this.length = this.returnAllPages();
  }

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

  selectPage(i: any) {
    let currentPage = i;
    this.selectPageEvent.emit(currentPage);
    this.backendService.getChildren(currentPage);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.selectPage(e.pageIndex + 1);
  }

  public returnAllPages() {
    return Math.ceil(this.storeService.childrenTotalCount / CHILDREN_PER_PAGE);
  }

  public cancelRegistration(childId: string) {
    this.dialog.open(ConfirmationDialogComponent);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    this.subscription = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.backendService.deleteChildData(childId, this.currentPage);
        this.dialog.closeAll();
      } else {
        this.dialog.closeAll();
      }
    });
  }

  ngAfterViewInit() {
    //    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    //    merge(this.sort.sortChange, this.paginator.page)
    //      .pipe(
    //        startWith({}),
    //        switchMap(() => {
    //          this.isLoadingResults = true;
    //          return this.exampleDatabase!.getRepoIssues(
    //            this.sort.active,
    //            this.sort.direction,
    //            this.paginator.pageIndex,
    //          ).pipe(catchError(() => of(null)));
    //        }),
    //        map((data) => {
    //          this.isLoadingResults = false;
    //
    //          if (data === null) {
    //            return [];
    //          }
    //
    //          this.resultsLength = data.total_count;
    //          return data.items;
    //        }),
    //      )
    //      .subscribe((data) => (this.data = data));
  }

  onFilterSelected(kindergarden: Kindergarden) {
    this.backendService.getChildrenByKindergardenId(kindergarden.id.toString());
  }

  onResetFilter() {
    this.backendService.getChildren(this.currentPage);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
