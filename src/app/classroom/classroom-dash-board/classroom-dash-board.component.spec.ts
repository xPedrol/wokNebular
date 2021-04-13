import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomDashBoardComponent } from './classroom-dash-board.component';

describe('ClassroomDashBoardComponent', () => {
  let component: ClassroomDashBoardComponent;
  let fixture: ComponentFixture<ClassroomDashBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomDashBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
