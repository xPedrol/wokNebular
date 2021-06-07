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
import {ISubmissionFileBasic, SubmissionFileBasic} from '../../shared/models/basic/submission-file-basic.model';
import {Authority} from '../../shared/constants/authority.constants';

@Component({
  selector: 'app-classroom-submission-upload-dialog',
  templateUrl: './classroom-submission-upload-dialog.component.html',
  styleUrls: ['./classroom-submission-upload-dialog.component.scss']
})
export class ClassroomSubmissionUploadDialogComponent implements OnInit {
  authorities: Authority[];
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
    this.userService.findUserTeamsByAccount(this.authorities).subscribe((teams: IUserTeamBasic[]) => {
      this.teams = teams || [];
    });
  }

  async submitFiles(): Promise<void> {
    if (this.submissionForm.valid) {
      const submissionPost: ISubmissionPost = new SubmissionPost(
        // this.files,
        this.submissionForm.get('entryPoint').value,
        this.submissionForm.get('languageId').value,
        Number(this.submissionForm.get('userTeamId').value)
      );
      submissionPost.files = await this.createSubmissionFileArray(this.files);
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

  async createSubmissionFileArray(files: File[]): Promise<ISubmissionFileBasic[]> {
    const submissionFileArray: ISubmissionFileBasic[] = [];
    for (const item of files) {
      // Get extension
      let extension = item.name.split('/').pop();
      if (extension) {
        extension = extension.indexOf('.') < 1 ? '' : extension.split('.').pop();
      }
      const file = await this.readFileContent(item);
      const submissionFile = {
        ...new SubmissionFileBasic(),
        name: item.name,
        solutionFile: file,
        extension
      };
      submissionFileArray.push(submissionFile);
    }
    return submissionFileArray;
  }

  readFileContent(file: File): Promise<string> {
    return new Promise<string>((resolve) => {
      if (!file) {
        resolve('');
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        const text = reader.result.toString();
        resolve(btoa(text));

      };

      reader.readAsText(file);
    });
  }
}
