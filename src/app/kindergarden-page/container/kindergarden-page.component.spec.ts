import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KindergardenPageComponent } from './kindergarden-page.component';

describe('KindergardenPageComponent', () => {
  let component: KindergardenPageComponent;
  let fixture: ComponentFixture<KindergardenPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KindergardenPageComponent]
    });
    fixture = TestBed.createComponent(KindergardenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
