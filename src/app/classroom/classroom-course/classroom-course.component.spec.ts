import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomInitialComponent } from './classroom-initial.component';

describe('ClassroomDashboardComponent', () => {
  let component: ClassroomInitialComponent;
  let fixture: ComponentFixture<ClassroomInitialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomInitialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomInitialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
