import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioSkillsDialogComponent } from './scenario-skills-dialog.component';

describe('ScenarioSkillsDialogComponent', () => {
  let component: ScenarioSkillsDialogComponent;
  let fixture: ComponentFixture<ScenarioSkillsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenarioSkillsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioSkillsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
