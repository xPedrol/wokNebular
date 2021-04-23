import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SharedFunctions} from '../shared.functions';
import {Authority} from '../constants/authority.constants';
import {ISolution} from '../models/solution.model';
import {SERVER_API_URL} from '../../app.constants';

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
}
