import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPublicCourseDialogComponent } from './add-public-course-dialog.component';

describe('AddPublicCourseDialogComponent', () => {
  let component: AddPublicCourseDialogComponent;
  let fixture: ComponentFixture<AddPublicCourseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPublicCourseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPublicCourseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
