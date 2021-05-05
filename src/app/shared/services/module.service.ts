import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Authority} from '../constants/authority.constants';
import {Observable} from 'rxjs';
import {ICourse} from '../models/course.model';
import {SERVER_API_URL} from '../../app.constants';
import {SharedFunctions} from '../shared.functions';
import {IModule, Module} from '../models/module.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(
    private http: HttpClient,
    private sF: SharedFunctions
  ) {
  }

  getModule(authorities: Authority[], courseSlug: string, disciplineSlug: string): Observable<IModule> {
    const url = `${this.sF.routeAuthSwitch(authorities)}courses/${courseSlug}/disciplines/${disciplineSlug}`;
    return this.http.get<IModule>(`${SERVER_API_URL}${url}`).pipe(map((module) => {
      return new Module(module);
    }));
  }

}
