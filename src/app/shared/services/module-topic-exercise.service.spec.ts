import { TestBed } from '@angular/core/testing';

import { ModuleTopicExerciseService } from './module-topic-exercise.service';

describe('ModuleTopicExerciseService', () => {
  let service: ModuleTopicExerciseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModuleTopicExerciseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
