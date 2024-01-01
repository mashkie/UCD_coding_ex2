import { Injectable } from '@angular/core';
import { Kindergarden } from '../interfaces/Kindergarden';
import { Child, ChildResponse } from '../interfaces/Child';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor() {}

  public kindergardens: Kindergarden[] = [];
  public children: ChildResponse[] = [];
  public childrenTotalCount: number = 0;
  public isLoading: boolean = false;
}
