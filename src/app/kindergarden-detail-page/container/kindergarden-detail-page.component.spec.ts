import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KindergardenDetailPageComponent } from './kindergarden-detail-page.component';

describe('KindergardenDetaiPageComponent', () => {
  let component: KindergardenDetailPageComponent;
  let fixture: ComponentFixture<KindergardenDetailPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KindergardenDetailPageComponent],
    });
    fixture = TestBed.createComponent(KindergardenDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
