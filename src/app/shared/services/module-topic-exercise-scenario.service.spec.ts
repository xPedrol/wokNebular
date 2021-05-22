import { TestBed } from '@angular/core/testing';

import { ModuleTopicExerciseScenarioService } from './module-topic-exercise-scenario.service';

describe('ModuleTopicExerciseScenarioService', () => {
  let service: ModuleTopicExerciseScenarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModuleTopicExerciseScenarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
