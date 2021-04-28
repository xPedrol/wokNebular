import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomSubmissionComponent } from './classroom-submission.component';

describe('ClassroomSubmissionComponent', () => {
  let component: ClassroomSubmissionComponent;
  let fixture: ComponentFixture<ClassroomSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomSubmissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
