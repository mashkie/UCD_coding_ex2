import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KindergardenListComponent } from './kindergarden-list.component';

describe('KindergardenListComponent', () => {
  let component: KindergardenListComponent;
  let fixture: ComponentFixture<KindergardenListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KindergardenListComponent]
    });
    fixture = TestBed.createComponent(KindergardenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
