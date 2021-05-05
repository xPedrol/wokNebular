import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomCourseCardComponent } from './classroom-course-card.component';

describe('ClassroomCourseCardComponent', () => {
  let component: ClassroomCourseCardComponent;
  let fixture: ComponentFixture<ClassroomCourseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomCourseCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomCourseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
