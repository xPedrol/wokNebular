import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomModuleComponent } from './classroom-module.component';

describe('ClassroomModuleComponent', () => {
  let component: ClassroomModuleComponent;
  let fixture: ComponentFixture<ClassroomModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
