import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersResultsTablesComponent } from './users-results-tables.component';

describe('UsersResultsTablesComponent', () => {
  let component: UsersResultsTablesComponent;
  let fixture: ComponentFixture<UsersResultsTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersResultsTablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersResultsTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
