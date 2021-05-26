import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SharedFunctions} from '../shared.functions';
import {Authority} from '../constants/authority.constants';
import {ISolution, Solution} from '../models/solution.model';
import {SERVER_API_URL} from '../../app.constants';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";

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
    return this.http.get<ISolution[]>(`${SERVER_API_URL}${url}`).pipe((map((solutions) => {
      return solutions.map((solution) => {
        return new Solution(solution);
      });
    })));
  }

  //
  // getSolutionFiles(authorities: Authority[], solutionId: number): Observable<ISolutionFile[]> {
  //   const url = `${this.sF.routeAuthSwitch(authosrities)}submissions/${solutionId}/files`;
  //   return this.http.get<ISolutionFile[]>(`${SERVER_API_URL}${url}`);
  // }
  getSolution(solutionSlug: string): Observable<ISolution> {
    const url = `teacher/exercises/solutions/${solutionSlug}`;
    return this.http.get<ISolution>(`${SERVER_API_URL}${url}`);
  }
}
