import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAboutDialogComponent } from './edit-about-dialog.component';

describe('EditAboutDialogComponent', () => {
  let component: EditAboutDialogComponent;
  let fixture: ComponentFixture<EditAboutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAboutDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAboutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
