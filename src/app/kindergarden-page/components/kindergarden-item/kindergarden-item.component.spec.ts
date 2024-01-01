import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KindergardenItemComponent } from './kindergarden-item.component';

describe('KindergardenItemComponent', () => {
  let component: KindergardenItemComponent;
  let fixture: ComponentFixture<KindergardenItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KindergardenItemComponent]
    });
    fixture = TestBed.createComponent(KindergardenItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
