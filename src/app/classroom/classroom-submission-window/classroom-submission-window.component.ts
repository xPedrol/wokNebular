import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Authority} from '../../shared/constants/authority.constants';
import {takeUntil} from 'rxjs/operators';
import {SubmissionService} from '../../shared/services/submission.service';
import {ISubmissionFile} from '../../shared/models/submission-file.model';

@Component({
  selector: 'app-classroom-submission-window',
  templateUrl: './classroom-submission-window.component.html',
  styleUrls: ['./classroom-submission-window.component.scss']
})
export class ClassroomSubmissionWindowComponent implements OnInit, OnDestroy {
  submissionId: number;
  loadingSubmission = true;
  authorities: Authority[];
  submissionFiles: ISubmissionFile[];
  destroy$ = new Subject();

  constructor(
    private submissionService: SubmissionService
  ) {
  }

  ngOnInit(): void {
    this.getSolutionFiles();
  }

  getSolutionFiles() {
    if (this.submissionId && this.authorities) {
      this.loadingSubmission = true;
      this.submissionService.getSubmissionFiles(this.authorities, this.submissionId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((submissionFiles: ISubmissionFile[]) => {
          this.submissionFiles = submissionFiles;
          this.loadingSubmission = false;
        }, () => this.loadingSubmission = false);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
