import { Component } from '@angular/core';
import { StoreService } from '../../shared/services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kindergarden-page',
  templateUrl: './kindergarden-page.component.html',
  styleUrls: ['./kindergarden-page.component.scss'],
})
export class KindergardenPageComponent {
  constructor(
    public storeService: StoreService,
    private router: Router,
  ) {}

  navigateToDetails(id: string) {
    this.router.navigate(['/kindergardens', id]);
  }
}
