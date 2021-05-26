import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ILanguageBasic} from '../models/basic/language-basic.model';
import {SERVER_API_URL} from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private http: HttpClient) {
  }

  getPublicLanguages(): Observable<ILanguageBasic[]> {
    return this.http
      .get<ILanguageBasic[]>(`${SERVER_API_URL}public/languages`);
  }
}
