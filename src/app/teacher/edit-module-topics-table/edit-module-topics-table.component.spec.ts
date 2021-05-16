import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModuleTopicsTableComponent } from './edit-module-topics-table.component';

describe('EditModuleTopicsTableComponent', () => {
  let component: EditModuleTopicsTableComponent;
  let fixture: ComponentFixture<EditModuleTopicsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditModuleTopicsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModuleTopicsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
