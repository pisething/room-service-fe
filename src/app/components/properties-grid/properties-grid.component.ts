import { Component, inject, OnInit, signal } from '@angular/core';
import { Room } from '../../models/room';
import { RoomService } from '../../services/room.service';
import { RoomListParams } from '../../models/room-list-params';
import { PropertyCardComponent } from "../property-card/property-card.component";

@Component({
  selector: 'app-properties-grid',
  imports: [PropertyCardComponent],
  templateUrl: './properties-grid.component.html',
  styleUrl: './properties-grid.component.css'
})
export class PropertiesGridComponent{
  
  
  private roomService = inject(RoomService);
  rooms = signal<Room[]>([]);
  //rooms: Room[]=[];
  params: RoomListParams = {page: 0, size: 2};

  ngOnInit(){
    this.loadData();
  }

  loadData(){
    this.roomService.list(this.params).subscribe(data =>{
      console.log(data);
      this.rooms.set(data.content);
      //this.rooms = data.content;
    });
  }

}
