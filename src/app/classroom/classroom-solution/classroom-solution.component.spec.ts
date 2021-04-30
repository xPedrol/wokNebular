import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomSolutionComponent } from './classroom-solution.component';

describe('ClassroomSolutionComponent', () => {
  let component: ClassroomSolutionComponent;
  let fixture: ComponentFixture<ClassroomSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomSolutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
