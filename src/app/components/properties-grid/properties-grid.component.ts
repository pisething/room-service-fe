import { Component, inject, input, output, signal } from '@angular/core';
import { Room } from '../../models/room';
import { RoomService } from '../../services/room.service';
import { RoomListParams } from '../../models/room-list-params';
import { PropertyCardComponent } from "../property-card/property-card.component";
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-properties-grid',
  imports: [PropertyCardComponent],
  templateUrl: './properties-grid.component.html',
  styleUrl: './properties-grid.component.css'
})
export class PropertiesGridComponent{
  
  filter = input.required<RoomListParams>();
  pageInfo = output<{ totalPages: number; totalElements: number }>();
  
  private roomService = inject(RoomService);
  rooms = signal<Room[]>([]);

  constructor(){
    toObservable(this.filter)
      .pipe(
        switchMap(f => this.roomService.list(f)),
        takeUntilDestroyed()
      )
      .subscribe(page =>{
        this.rooms.set(page.content);
        this.pageInfo.emit({
          totalPages: page.totalPage ?? 0,
          totalElements: page.totalElements ?? 0
        });
      })
  }

}

