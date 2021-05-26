import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Authority} from '../constants/authority.constants';
import {SERVER_API_URL} from '../../app.constants';
import {SharedFunctions} from '../shared.functions';
import {ISubmissionFile, SubmissionFile} from '../models/submission-file.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ISubmission, Submission} from '../models/submission.model';
import {ISubmissionPost} from '../models/submission-post.model';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  constructor(
    private http: HttpClient,
    private sF: SharedFunctions
  ) {
  }

  getSubmissionFiles(authorities: Authority[], solutionId: number): Observable<ISubmissionFile[]> {
    const url = `${this.sF.routeAuthSwitch(authorities)}submissions/${solutionId}/files`;
    return this.http.get<ISubmissionFile[]>(`${SERVER_API_URL}${url}`).pipe(map((files) => {
      return files.map((file) => {
        return new SubmissionFile(file);
      });
    }));
  }

  getSubmissionsBySlugs(authorities: Authority[], moduleTopicExerciseId) {
    const url = `${this.sF.routeAuthSwitch(authorities)}modules/topics/exercises/${moduleTopicExerciseId}/submissions`;
    return this.http.get<ISubmission[]>(`${SERVER_API_URL}${url}`).pipe(map((submissions) => {
      return submissions.map((submission) => {
        return new Submission(submission);
      });
    }));
  }

  submitFiles(files: ISubmissionPost, courseSlug: string, disciplineSlug: string, topicSlug: string, exerciseSlug: string)
    : Observable<ISubmissionPost> {
    const url = `account/courses/${courseSlug}/disciplines/${disciplineSlug}/topics/${topicSlug}/exercises/${exerciseSlug}/submissions`;
    return this.http.post<ISubmissionPost>(`${SERVER_API_URL}${url}`, files);
  }
}
