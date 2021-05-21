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

  getModuleTopics(authorities: Authority[], courseSlug: string, disciplineSlug: string, array = false)
    : Observable<IModuleTopic[][] | IModuleTopic[]> {
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
      if (!array) {
        return objMts;
      } else {
        return objMts.reduce(
          (acc, val) => acc.concat(val),
          []
        );
      }
    }));
  }

  getTopic(authorities: Authority[], disciplineSlug: string, topicSlug: string): Observable<ITopic> {
    const url = `${this.sF.routeAuthSwitch(authorities)}modules/${disciplineSlug}/topics/${topicSlug}/topic`;
    return this.http.get<ITopic>(`${SERVER_API_URL}${url}`);
  }

  update(authorities: Authority[], moduleTopic: IModuleTopic): Observable<IModuleTopic> {
    const url = `${this.sF.routeAuthSwitch(authorities)}modules/topics`;
    return this.http
      .put<IModuleTopic>(`${SERVER_API_URL}${url}`, moduleTopic);
  }

  synchronizeMTDates(
    authorities: Authority[],
    moduleTopicDates: any
  ): Observable<any> {
    const url = `${this.sF.routeAuthSwitch(authorities)}modules/topics/${moduleTopicDates?.moduleTopicId}/updateTimesModuleTopic`;
    // if (authority === Authority.ADMIN || this.accountService.isAdmin()) {
    //   url = `${SERVER_API_URL}api/admin/modules/topics/${moduleTopicDates?.moduleTopicId}/updateTimesModuleTopic`;
    // } else if (authority === Authority.TEACHER) {
    //   url = `${SERVER_API_URL}api/teacher/modules/topics/${moduleTopicDates?.moduleTopicId}/updateTimesModuleTopic`;
    // }
    moduleTopicDates.moduleTopicId = undefined;
    return this.http
      .put<IModuleTopic>(`${SERVER_API_URL}${url}`, moduleTopicDates);
  }

  getModuleTopicBySlugs(authorities: Authority[], courseSlug: string, disciplineSlug: string, topicSlug: string): Observable<IModuleTopic> {
    const url = `${this.sF.routeAuthSwitch(authorities)}courses/${courseSlug}/disciplines/${disciplineSlug}/topics/${topicSlug}`;
    return this.http
      .get<IModuleTopic>(`${SERVER_API_URL}${url}`).pipe(map((mT) => {
        return new ModuleTopic(mT);
      }));
  }

  getTopicByModuleTopicId(moduleTopicId: number): Observable<ITopic> {
    const url = `teacher/modules/topics/${moduleTopicId}/topic`;
    return this.http
      .get<ITopic>(`${SERVER_API_URL}${url}`);
  }
}


