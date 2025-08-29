import { Component, inject, input, signal } from '@angular/core';
import { Room } from '../../models/room';
import { RoomService } from '../../services/room.service';
import { RoomListParams } from '../../models/room-list-params';
import { PropertyCardComponent } from "../property-card/property-card.component";
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-properties-grid',
  imports: [PropertyCardComponent],
  templateUrl: './properties-grid.component.html',
  styleUrl: './properties-grid.component.css'
})
export class PropertiesGridComponent{

  filters = input.required<RoomListParams>();  
  private roomService = inject(RoomService);
  rooms = signal<Room[]>([]);
  
  params: RoomListParams = {page: 0, size: 4};

  constructor() {
  toObservable(this.filters)
    .pipe(
      switchMap(f => this.roomService.list(f)),
      takeUntilDestroyed()
    )
    .subscribe(page => this.rooms.set(page.content));
}

}
