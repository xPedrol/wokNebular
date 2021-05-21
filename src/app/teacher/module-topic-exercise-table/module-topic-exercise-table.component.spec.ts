import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleTopicExerciseTableComponent } from './module-topic-exercise-table.component';

describe('ModuleTopicExerciseTableComponent', () => {
  let component: ModuleTopicExerciseTableComponent;
  let fixture: ComponentFixture<ModuleTopicExerciseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleTopicExerciseTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleTopicExerciseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
