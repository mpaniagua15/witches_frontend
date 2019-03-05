import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WitchDTO } from "../models/witchDTO";
import { SupremeDTO } from "../models/supremeDTO";
import { CommonDTO } from "../models/commonDTO";
import { WitchPage } from "../models/witch-page";

@Injectable()
export class WitchService {

  private urlEndPoint: string = 'http://localhost:8080/api/witches';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getWitches(
    currentPage: number,
    pageSize: number,
    sort: string = 'id',
    dir: string = 'ASC',
    witchName: string = null,
    witchId: number = null): Observable<WitchPage> {

      const queryParams = {
        page_number: currentPage,
        page_size: pageSize,
        sort_by: sort,
        sort_direction: dir
      };

      if(witchId != null){
        queryParams['filter_id'] = witchId;
      }

      if(witchName != null){
        queryParams['filter_name'] = witchName;
      }

      const params = Object.keys(queryParams).map(key => key + '=' + queryParams[key]).join('&');

      return this.http.get<WitchPage>(`${this.urlEndPoint}?${params}`);

  }

  getWitchById(id: number): Observable<WitchDTO> {
    return this.http.get<WitchDTO>(`${this.urlEndPoint}/${id}`);
  }

  createSupreme(supremeWitch: SupremeDTO): Observable<SupremeDTO> {
    return this.http.post<SupremeDTO>(`${this.urlEndPoint}/supreme`,
      supremeWitch,
      {headers: this.httpHeaders});
  }

  createCommon(commonWitch: CommonDTO): Observable<CommonDTO> {
    return this.http.post<CommonDTO>(`${this.urlEndPoint}/common`,
      commonWitch,
      {headers: this.httpHeaders});
  }

  updateSupreme(supremeWitch: SupremeDTO): Observable<SupremeDTO> {
    return this.http.put<SupremeDTO>(`${this.urlEndPoint}/supreme`,
      supremeWitch,
      {headers: this.httpHeaders});
  }

  updateCommon(commonWitch: CommonDTO): Observable<CommonDTO> {
    return this.http.put<CommonDTO>(`${this.urlEndPoint}/common`,
      commonWitch,
      {headers: this.httpHeaders});
  }

  delete(id: number): Observable<CommonDTO> {
    return this.http.delete<CommonDTO>(`${this.urlEndPoint}/${id}`,
      {headers: this.httpHeaders});
  }


}
