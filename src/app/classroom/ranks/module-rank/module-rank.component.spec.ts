import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleRankComponent } from './module-rank.component';

describe('ModuleRankComponent', () => {
  let component: ModuleRankComponent;
  let fixture: ComponentFixture<ModuleRankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleRankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
