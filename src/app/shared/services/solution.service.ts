import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SharedFunctions} from '../shared.functions';
import {Authority} from '../constants/authority.constants';
import {ISolution} from '../models/solution.model';
import {SERVER_API_URL} from '../../app.constants';
import {ISolutionFile} from '../models/solution-file.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  constructor(
    private http: HttpClient,
    private sF: SharedFunctions
  ) {
  }

  getSolutions(authorities: Authority[], exerciseSlug: string) {
    const url = `${this.sF.routeAuthSwitch(authorities)}exercises/${exerciseSlug}/solutions`;
    return this.http.get<ISolution[]>(`${SERVER_API_URL}${url}`);
  }
  //
  // getSolutionFiles(authorities: Authority[], solutionId: number): Observable<ISolutionFile[]> {
  //   const url = `${this.sF.routeAuthSwitch(authorities)}submissions/${solutionId}/files`;
  //   return this.http.get<ISolutionFile[]>(`${SERVER_API_URL}${url}`);
  // }

}
