import { Component, OnDestroy, OnInit } from '@angular/core';
import { StoreService } from '../../shared/services/store.service';
import { BackendService } from '../../shared/services/backend.service';
import { MatDialog } from '@angular/material/dialog';
import { CHILDREN_PER_PAGE } from '../../shared/constants';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { Subscription } from 'rxjs';
import { SortEvent } from '../../shared/interfaces/SortEvent';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public currentPage: number = 1;
  public showAddData = true;
  pageSize: number = CHILDREN_PER_PAGE;
  subscription: Subscription = new Subscription();
  filterActive: boolean = false;
  kindergardenId: string = '';
  sort: SortEvent = {
    active: 'name',
    direction: 'asc',
  };

  constructor(
    public storeService: StoreService,
    private backendService: BackendService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.backendService.getChildren(this.currentPage, this.sort);
  }

  receiveMessage(newPageCount: number) {
    this.currentPage = newPageCount;
    if (this.filterActive) {
      this.backendService.getChildren(
        newPageCount,
        this.sort,
        this.kindergardenId,
      );
      return;
    }
    this.backendService.getChildren(newPageCount, this.sort);
  }

  toggleButtonClicked(showAddData: boolean) {
    this.showAddData = showAddData;
  }

  getPageCount(): number {
    return this.storeService.childrenTotalCount;
  }

  onRegistrationCanceled(childId: string) {
    this.dialog.open(ConfirmationDialogComponent);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    this.subscription = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.backendService.deleteChildData(
          childId,
          this.currentPage,
          this.sort,
        );
        this.dialog.closeAll();
      } else {
        this.dialog.closeAll();
      }
    });
  }

  sortTable(sort: SortEvent) {
    this.sort = sort;
    this.backendService.getChildren(this.currentPage, sort);
  }

  filterTable(kindergardenId: string) {
    this.kindergardenId = kindergardenId;
    this.filterActive = true;
    this.backendService.getChildren(
      this.currentPage,
      this.sort,
      kindergardenId,
    );
  }

  resetFilter() {
    this.filterActive = false;
    this.backendService.getChildren(this.currentPage, this.sort);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
