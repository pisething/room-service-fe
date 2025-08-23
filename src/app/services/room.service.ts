import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../models/page';
import { Room } from '../models/room';
import { RoomListParams } from '../models/room-list-params';
import { environment } from '../../environment/environment';
import { buildParams } from '../core/http/utils';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/rooms/search/pagination`;

  constructor() { }


list(params?: RoomListParams): Observable<Page<Room>> {
  return this.http.get<Page<Room>>(this.base, { params: buildParams<RoomListParams>(params) });
}
}
