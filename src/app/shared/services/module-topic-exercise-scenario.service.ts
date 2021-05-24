import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IModuleTopicExerciseScenario, ModuleTopicExerciseScenario} from '../models/module-topic-exercise-scenario.model';
import {IModuleTopicExercise} from '../models/basic/module-topic-exercise.model';
import {SERVER_API_URL} from '../../app.constants';
import {map} from 'rxjs/operators';
import {IScenarioSkill} from '../models/scenario-skill.model';
import {IScenarioTestFile} from '../models/scenario-test-file.model';
import {IScenarioTest} from '../models/scenario-test.model';

@Injectable({
  providedIn: 'root'
})
export class ModuleTopicExerciseScenarioService {

  constructor(
    private http: HttpClient
  ) {
  }

  getModuleTopicExerciseScenarioByMTEId(mTEId: number): Observable<IModuleTopicExerciseScenario[]> {
    return this.http
      .get<IModuleTopicExerciseScenario[]>(`${SERVER_API_URL}teacher/modules/topics/exercises/${mTEId}/scenarios`)
      .pipe(map((scenarios) => {
        return scenarios.map((scenario) => {
          return new ModuleTopicExerciseScenario(scenario);
        });
      }));
  }

  getScenarioSkillsByScenarioId(scenarioId: number): Observable<IScenarioSkill[]> {
    return this.http
      .get<IScenarioSkill[]>(`${SERVER_API_URL}teacher/scenarios/${scenarioId}/skills`);
  }

  getScenarioFilesByScenarioId(scenarioId: number): Observable<IScenarioTest[]> {
    return this.http
      .get<IScenarioTest[]>(`${SERVER_API_URL}teacher/scenarios/${scenarioId}/tests/files`);
  }
}
