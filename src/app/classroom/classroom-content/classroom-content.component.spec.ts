import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomContentComponent } from './classroom-content.component';

describe('ClassroomContentComponent', () => {
  let component: ClassroomContentComponent;
  let fixture: ComponentFixture<ClassroomContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
