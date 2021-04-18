import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomTopicComponent } from './classroom-topic.component';

describe('ClassroomTopicComponent', () => {
  let component: ClassroomTopicComponent;
  let fixture: ComponentFixture<ClassroomTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomTopicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
