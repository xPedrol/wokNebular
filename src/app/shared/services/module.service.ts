import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Authority} from '../constants/authority.constants';
import {Observable} from 'rxjs';
import {ICourse} from '../models/course.model';
import {SERVER_API_URL} from '../../app.constants';
import {SharedFunctions} from '../shared.functions';
import {IModule} from '../models/module.model';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(
    private http: HttpClient,
    private sF: SharedFunctions
  ) {
  }

  getModule(authorities: Authority[], moduleId: number): Observable<IModule> {
    const url = `${this.sF.routeAuthSwitch(authorities)}modules/${moduleId}`;
    return this.http.get<IModule>(`${SERVER_API_URL}${url}`);
  }

}
