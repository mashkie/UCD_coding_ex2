import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../../shared/services/store.service';
import { Kindergarden, Typ } from '../../shared/interfaces/Kindergarden';

@Component({
  selector: 'app-kindergarden-detail-page',
  templateUrl: './kindergarden-detail-page.component.html',
  styleUrls: ['./kindergarden-detail-page.component.scss'],
})
export class KindergardenDetailPageComponent {
  kindergarden: Kindergarden;
  routeParam: string;

  constructor(
    private route: ActivatedRoute,
    public storeService: StoreService,
  ) {
    this.routeParam = this.route.snapshot.params['id'];
  }

  setTitle(kindergardens: Kindergarden[]): string {
    return kindergardens.find((k) => k.id.toString() === this.routeParam).name;
  }

  setImage(kindergardens: Kindergarden[]): string {
    return kindergardens.find((k) => k.id.toString() === this.routeParam)
      .imgPath;
  }

  setType(kindergardens: Kindergarden[]): number {
    return kindergardens.find((k) => k.id.toString() === this.routeParam).typ;
  }

  setAddress(kindergardens: Kindergarden[]): string {
    return kindergardens.find((k) => k.id.toString() === this.routeParam)
      .address;
  }

  setOwner(kindergardens: Kindergarden[]): string {
    return kindergardens.find((k) => k.id.toString() === this.routeParam)
      .betreiber;
  }

  protected readonly Typ = Typ;
}
