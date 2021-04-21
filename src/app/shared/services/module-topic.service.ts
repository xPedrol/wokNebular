import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SharedFunctions} from '../shared.functions';
import {Authority} from '../constants/authority.constants';
import {Observable} from 'rxjs';
import {SERVER_API_URL} from '../../app.constants';
import {IModuleTopic, ModuleTopic} from '../models/module-topic.model';
import {map} from 'rxjs/operators';
import {ITopic} from '../models/topic.model';

@Injectable({
  providedIn: 'root'
})
export class ModuleTopicService {

  constructor(
    private http: HttpClient,
    private sF: SharedFunctions
  ) {
  }

  getModuleTopics(authorities: Authority[], courseSlug: string, disciplineSlug: string): Observable<IModuleTopic[][]> {
    const url = `${this.sF.routeAuthSwitch(authorities)}courses/${courseSlug}/modules/${disciplineSlug}/topics`;
    return this.http.get<IModuleTopic[][]>(`${SERVER_API_URL}${url}`).pipe(map((mTs) => {
      let objMts: IModuleTopic[][] = Object.keys(mTs).map((key) =>
        mTs ? mTs[key] : []
      );
      objMts = objMts.map((mtsA) => {
        return mtsA.map((mt) => {
          return new ModuleTopic(mt);
        });
      });
      return objMts;
    }));
  }

  getTopic(authorities: Authority[], disciplineSlug: string, topicSlug: string): Observable<ITopic> {
    const url = `${this.sF.routeAuthSwitch(authorities)}modules/${disciplineSlug}/topics/${topicSlug}/topic`;
    return this.http.get<ITopic>(`${SERVER_API_URL}${url}`);
  }
}

