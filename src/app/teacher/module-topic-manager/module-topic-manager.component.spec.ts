import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleTopicManagerComponent } from './module-topic-manager.component';

describe('ModuleTopicManagerComponent', () => {
  let component: ModuleTopicManagerComponent;
  let fixture: ComponentFixture<ModuleTopicManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleTopicManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleTopicManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
