import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitExerciseResolutionComponent } from './submit-exercise-resolution.component';

describe('SubmitExerciseResolutionComponent', () => {
  let component: SubmitExerciseResolutionComponent;
  let fixture: ComponentFixture<SubmitExerciseResolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitExerciseResolutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitExerciseResolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
