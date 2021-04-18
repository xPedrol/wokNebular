import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IAffiliationBasic} from '../models/basic/affiliation-basic.model';
import {SERVER_API_URL} from '../../app.constants';
import {createRequestOption} from '../util/request-util';

@Injectable({
  providedIn: 'root'
})
export class AffiliationService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAllAffiliation(req?: any): Observable<IAffiliationBasic[]> {
    const options = createRequestOption(req);
    return this.http
      .get<IAffiliationBasic[]>(`${SERVER_API_URL}public/affiliations`, {params: options});
  }
}
