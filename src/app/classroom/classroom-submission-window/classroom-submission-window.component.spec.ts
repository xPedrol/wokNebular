import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomSubmissionWindowComponent } from './classroom-submission-window.component';

describe('ClassroomSubmissionWindowComponent', () => {
  let component: ClassroomSubmissionWindowComponent;
  let fixture: ComponentFixture<ClassroomSubmissionWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomSubmissionWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomSubmissionWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
