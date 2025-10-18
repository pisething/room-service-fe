import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../environment/environment';

export enum AdminLevel {
  PROVINCE = 'PROVINCE',
  DISTRICT = 'DISTRICT',
  COMMUNE = 'COMMUNE',
  VILLAGE = 'VILLAGE',
}

export interface AdminAreaResponse {
  code: string;
  nameEn: string;
  level: AdminLevel;
  parentCode?: string | null;
}

@Injectable({ providedIn: 'root' })
export class AddressService {
  private base = `${environment.addressApiUrl}`;
  private readonly baseUrl = this.base +'/admin-areas/slim';
  private provinces$?: Observable<AdminAreaResponse[]>;

  constructor(private http: HttpClient) {}

  getProvinces(): Observable<AdminAreaResponse[]> {
    if (this.provinces$) {
      return this.provinces$;
    }
    const params = new HttpParams().set('level', AdminLevel.PROVINCE);
    this.provinces$ = this.http
      .get<AdminAreaResponse[]>(this.baseUrl, { params })
      .pipe(shareReplay(1));
    return this.provinces$;
  }

  getDistricts(provinceCode: string): Observable<AdminAreaResponse[]> {
    let params = new HttpParams()
      .set('level', AdminLevel.DISTRICT)
      .set('parentCode', provinceCode);
    return this.http.get<AdminAreaResponse[]>(this.baseUrl, { params });
  }

  getCommunes(districtCode: string): Observable<AdminAreaResponse[]> {
    let params = new HttpParams()
      .set('level', AdminLevel.COMMUNE)
      .set('parentCode', districtCode);
    return this.http.get<AdminAreaResponse[]>(this.baseUrl, { params });
  }

  getVillages(communeCode: string): Observable<AdminAreaResponse[]> {
    let params = new HttpParams()
      .set('level', AdminLevel.VILLAGE)
      .set('parentCode', communeCode);
    return this.http.get<AdminAreaResponse[]>(this.baseUrl, { params });
  }
}
