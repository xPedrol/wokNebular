import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersResultsTableComponent } from './users-results-table.component';

describe('UsersResultsTableComponent', () => {
  let component: UsersResultsTableComponent;
  let fixture: ComponentFixture<UsersResultsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersResultsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersResultsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
