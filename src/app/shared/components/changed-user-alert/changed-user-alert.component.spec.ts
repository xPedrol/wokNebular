import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangedUserAlertComponent } from './changed-user-alert.component';

describe('ChangedUserAlertComponent', () => {
  let component: ChangedUserAlertComponent;
  let fixture: ComponentFixture<ChangedUserAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangedUserAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangedUserAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
