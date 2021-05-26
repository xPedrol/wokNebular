import {Component, OnInit} from '@angular/core';
import {IModuleTopicExercise} from '../../shared/models/basic/module-topic-exercise.model';
import {LanguageService} from '../../shared/services/language.service';
import {ILanguageBasic} from '../../shared/models/basic/language-basic.model';
import {UserService} from '../../shared/services/user.service';
import {IUserTeamBasic} from '../../shared/models/basic/userTeam-basic.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ISubmissionPost, SubmissionPost} from '../../shared/models/submission-post.model';
import {SubmissionService} from '../../shared/services/submission.service';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'app-classroom-submission-upload-dialog',
  templateUrl: './classroom-submission-upload-dialog.component.html',
  styleUrls: ['./classroom-submission-upload-dialog.component.scss']
})
export class ClassroomSubmissionUploadDialogComponent implements OnInit {
  mTExercise: IModuleTopicExercise;
  courseSlug: string;
  disciplineSlug: string;
  topicSlug: string;
  exerciseSlug: string;
  languages: ILanguageBasic[];
  files: File[] = [];
  teams: IUserTeamBasic[];
  submissionForm: FormGroup;

  constructor(
    private languageService: LanguageService,
    private userService: UserService,
    private submissionService: SubmissionService,
    private toastService: NbToastrService
  ) {
  }

  ngOnInit(): void {
    this.getLanguages();
    this.getUserTeams();
    this.submissionForm = new FormGroup({
      entryPoint: new FormControl(null, [Validators.required]),
      languageId: new FormControl(null, [Validators.required]),
      userTeamId: new FormControl(null, [Validators.required])
    });
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  public getLanguages(): void {
    this.languageService.getPublicLanguages().subscribe((languages: ILanguageBasic[]) => {
      this.languages = languages || [];
    });
  }

  public getUserTeams(): void {
    this.userService.findUserTeamsByAccount().subscribe((teams: IUserTeamBasic[]) => {
      this.teams = teams || [];
    });
  }

  submitFiles(): void {
    if (this.submissionForm.valid) {
      const submissionPost: ISubmissionPost = new SubmissionPost(
        this.submissionForm.get('entryPoint').value,
        this.files,
        this.submissionForm.get('languageId').value,
        Number(this.submissionForm.get('userTeamId').value)
      );
      this.submissionService.submitFiles(
        submissionPost,
        this.courseSlug,
        this.disciplineSlug,
        this.topicSlug,
        this.exerciseSlug
      ).subscribe(() => {
        this.toastService.show('', 'Enviado com sucesso', {status: 'success'});
      });
    }
  }
}
