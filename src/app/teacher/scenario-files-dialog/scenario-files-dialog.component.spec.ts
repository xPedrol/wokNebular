import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioFilesDialogComponent } from './scenario-files-dialog.component';

describe('ScenarioFilesDialogComponent', () => {
  let component: ScenarioFilesDialogComponent;
  let fixture: ComponentFixture<ScenarioFilesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenarioFilesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioFilesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
