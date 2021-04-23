import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SharedFunctions} from '../shared.functions';
import {Authority} from '../constants/authority.constants';
import {IExerciseBasic} from '../models/basic/exercise-basic.model';
import {SERVER_API_URL} from '../../app.constants';
import {IModuleTopicExercise} from '../models/basic/module-topic-exercise.model';

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
}
