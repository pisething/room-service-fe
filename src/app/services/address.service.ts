import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

export enum AdminLevel {
  PROVINCE = 'PROVINCE',
  DISTRICT  = 'DISTRICT',
  COMMUNE   = 'COMMUNE',
  VILLAGE   = 'VILLAGE',
}

export interface AdminAreaResponse {
  code: string;
  nameEn: string;
  level: AdminLevel;
  parentCode?: string | null;
}

@Injectable({ providedIn: 'root' })
export class AddressService {
  private readonly baseUrl = `${environment.addressApiUrl}/admin-areas/slim`;

  constructor(private http: HttpClient) {}

  getProvinces(): Observable<AdminAreaResponse[]> {
    const params = new HttpParams().set('level', AdminLevel.PROVINCE);
    return this.http.get<AdminAreaResponse[]>(this.baseUrl, { params });
  }

  getDistricts(provinceCode: string): Observable<AdminAreaResponse[]> {
    const params = new HttpParams()
      .set('level', AdminLevel.DISTRICT)
      .set('parentCode', provinceCode);
    return this.http.get<AdminAreaResponse[]>(this.baseUrl, { params });
  }

  getCommunes(districtCode: string): Observable<AdminAreaResponse[]> {
    const params = new HttpParams()
      .set('level', AdminLevel.COMMUNE)
      .set('parentCode', districtCode);
    return this.http.get<AdminAreaResponse[]>(this.baseUrl, { params });
  }

  getVillages(communeCode: string): Observable<AdminAreaResponse[]> {
    const params = new HttpParams()
      .set('level', AdminLevel.VILLAGE)
      .set('parentCode', communeCode);
    return this.http.get<AdminAreaResponse[]>(this.baseUrl, { params });
  }
}
