import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kindergarden } from '../interfaces/Kindergarden';
import { StoreService } from './store.service';
import { Child, ChildResponse } from '../interfaces/Child';
import { CHILDREN_PER_PAGE } from '../constants';
import { SnackbarService } from './snackbar.service';
import { SortEvent } from '../interfaces/SortEvent';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(
    private http: HttpClient,
    private storeService: StoreService,
    private snackbarService: SnackbarService,
  ) {}

  public getKindergardens() {
    this.http
      .get<Kindergarden[]>('http://localhost:5000/kindergardens')
      .subscribe({
        next: (data) => {
          this.storeService.kindergardens = data;
        },
        error: (error) => {
          this.snackbarService.openSnackBar(
            'Fehler beim Laden der Kindergärten',
          );
        },
      });
  }

  public getChildren(page: number, sort: SortEvent, kindergardenId?: string) {
    let url = `http://localhost:5000/childs?_expand=kindergarden&_page=${page}&_limit=${CHILDREN_PER_PAGE}&_sort=${sort.active}&_order=${sort.direction}`;
    if (kindergardenId) {
      url += `&kindergardenId=${kindergardenId}`;
    }
    this.storeService.isLoading = true;
    this.http.get<ChildResponse[]>(url, { observe: 'response' }).subscribe({
      next: (data: HttpResponse<ChildResponse[]>) => {
        this.storeService.isLoading = false;
        this.storeService.children = data.body!;
        this.storeService.childrenTotalCount = Number(
          data.headers.get('X-Total-Count'),
        );
      },
      error: (error) => {
        this.snackbarService.openSnackBar('Fehler beim Laden der Kinder');
        this.storeService.isLoading = false;
      },
    });
  }

  public addChildData(child: Child, page: number, sort: SortEvent) {
    this.storeService.isLoading = true;
    this.http.post('http://localhost:5000/childs', child).subscribe({
      next: (_) => {
        this.storeService.isLoading = false;
        this.snackbarService.openSnackBar('Kind wurde erfolgreich hinzugefügt');
        this.getChildren(page, sort);
      },
      error: (error) => {
        this.storeService.isLoading = false;
        this.snackbarService.openSnackBar('Fehler beim Hinzufügen des Kindes');
      },
    });
  }

  public deleteChildData(childId: string, page: number, sort: SortEvent) {
    this.storeService.isLoading = true;
    this.http.delete(`http://localhost:5000/childs/${childId}`).subscribe({
      next: (_) => {
        this.storeService.isLoading = false;
        this.getChildren(page, sort);
      },
      error: (error) => {
        this.storeService.isLoading = false;
        this.snackbarService.openSnackBar('Fehler beim Löschen des Kindes');
      },
    });
  }
}
