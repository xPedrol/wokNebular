import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(
    private http: HttpClient
  ) {
  }

  getCitiesByUF(uf: string): Observable<string[]> {
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos?orderBy=nome`;
    return this.http.get<any[]>(`${url}`).pipe(map((datas) => {
      return datas.map((data) => {
        return data.nome;
      });
    }));
  }
}
