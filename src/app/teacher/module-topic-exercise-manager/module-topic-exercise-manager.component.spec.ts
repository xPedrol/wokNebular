import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleTopicExerciseManagerComponent } from './module-topic-exercise-manager.component';

describe('ModuleTopicExerciseManagerComponent', () => {
  let component: ModuleTopicExerciseManagerComponent;
  let fixture: ComponentFixture<ModuleTopicExerciseManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleTopicExerciseManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleTopicExerciseManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
