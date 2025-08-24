import { Component, inject, signal } from '@angular/core';
import { Page } from '../../models/page';
import { Room } from '../../models/room';
import { RoomListParams } from '../../models/room-list-params';
import { RoomService } from '../../services/room.service';
import { RoomCardComponent } from "../room-card/room-card.component";

@Component({
  selector: 'app-properties-grid',
  imports: [RoomCardComponent],
  templateUrl: './properties-grid.component.html',
  styleUrl: './properties-grid.component.css'
})
export class PropertiesGridComponent {
  private roomService = inject(RoomService);

  rooms    = signal<Room[]>([]);
  

  params: RoomListParams = { page: 0, size: 2, sort: 'createdAt,desc' };

  ngOnInit() { this.loadData(); }

  loadData(){
      this.roomService.list(this.params).subscribe(data =>{
        console.log(data);
        this.rooms.set(data.content);
      });
  }

  onFavorite(room: Room) { console.log('Favorite clicked:', room.id); }
  onView(room: Room)     { console.log('View clicked:', room.id); }

}
