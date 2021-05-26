import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomSubmissionUploadDialogComponent } from './classroom-submission-upload-dialog.component';

describe('ClassroomSubmissionUploadDialogComponent', () => {
  let component: ClassroomSubmissionUploadDialogComponent;
  let fixture: ComponentFixture<ClassroomSubmissionUploadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomSubmissionUploadDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomSubmissionUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
