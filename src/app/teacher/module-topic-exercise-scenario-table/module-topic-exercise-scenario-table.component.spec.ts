import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleTopicExerciseScenarioTableComponent } from './module-topic-exercise-scenario-table.component';

describe('ModuleTopicExerciseScenarioTableComponent', () => {
  let component: ModuleTopicExerciseScenarioTableComponent;
  let fixture: ComponentFixture<ModuleTopicExerciseScenarioTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleTopicExerciseScenarioTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleTopicExerciseScenarioTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
