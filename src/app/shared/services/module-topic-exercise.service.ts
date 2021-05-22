import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SharedFunctions} from '../shared.functions';
import {Authority} from '../constants/authority.constants';
import {IExerciseBasic} from '../models/basic/exercise-basic.model';
import {SERVER_API_URL} from '../../app.constants';
import {IModuleTopicExercise} from '../models/basic/module-topic-exercise.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModuleTopicExerciseService {

  constructor(
    private http: HttpClient,
    private sF: SharedFunctions
  ) {
  }

  getBasicExercise(authorities: Authority[], disciplineSlug: string, topicSlug: string) {
    const url = `${this.sF.routeAuthSwitch(authorities)}modules/${disciplineSlug}/topics/${topicSlug}/exercises`;
    return this.http.get<IExerciseBasic[]>(`${SERVER_API_URL}${url}`);
  }

  getModuleTopicExercise(authorities: Authority[], courseSlug: string, disciplineSlug: string, topicSlug: string, exerciseSlug: string) {
    const url = `${this.sF.routeAuthSwitch(authorities)}course/${courseSlug}/disciplines/${disciplineSlug}/topics/${topicSlug}/exercises/${exerciseSlug}`;
    return this.http.get<IModuleTopicExercise>(`${SERVER_API_URL}${url}`);
  }

  getModuleTopicExercisesByModuleId(
    id: number
  ): Observable<IModuleTopicExercise[]> {
    return this.http
      .get<IModuleTopicExercise[]>(`${SERVER_API_URL}teacher/modules/${id}/topics/exercises`);
  }

  getModuleTopicExercisesByModuleTopicId(
    moduleTopicId: number
  ): Observable<IModuleTopicExercise[]> {
    return this.http
      .get<IModuleTopicExercise[]>(`${SERVER_API_URL}teacher/modules/topics/${moduleTopicId}/exercises`);
  }

  updateModuleTopicExercise(mTE: IModuleTopicExercise) {
    return this.http
      .put<IModuleTopicExercise[]>(`${SERVER_API_URL}teacher/modules/topics/exercises`, mTE);
  }
}
