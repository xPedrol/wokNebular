import { TestBed } from '@angular/core/testing';

import { ModuleTopicService } from './module-topic.service';

describe('ModuleTopicService', () => {
  let service: ModuleTopicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModuleTopicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
