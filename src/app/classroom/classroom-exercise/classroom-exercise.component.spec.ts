import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomExerciseComponent } from './classroom-exercise.component';

describe('ClassroomExerciseComponent', () => {
  let component: ClassroomExerciseComponent;
  let fixture: ComponentFixture<ClassroomExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomExerciseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
