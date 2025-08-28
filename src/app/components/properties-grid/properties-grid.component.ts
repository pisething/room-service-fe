import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Room } from '../../models/room';
import { RoomService } from '../../services/room.service';
import { RoomListParams } from '../../models/room-list-params';
import { PropertyCardComponent } from "../property-card/property-card.component";
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap, tap } from 'rxjs';

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
  //rooms: Room[]=[];
  params: RoomListParams = {page: 0, size: 4};

  //rooms = signal<Room[]>([]);
  loading = signal<boolean>(true);
  error   = signal<unknown>(null);

  constructor() {
    // react to filter changes
    toObservable(this.filters)
      .pipe(
        tap(() => { this.loading.set(true); this.error.set(null); }),
        switchMap((f) =>
          this.roomService.list(f).pipe(
            tap(page => this.rooms.set(page.content)),
            catchError(err => {
              this.error.set(err);
              this.rooms.set([]);
              return of(null);
            }),
            tap(() => this.loading.set(false))
          )
        ),
        takeUntilDestroyed()
      )
      .subscribe();
  }
/*
  rooms = signal<Room[]>([]);

  ngOnInit(){
    this.loadData();
  }

  loadData(){
    this.roomService.list(this.filters()).subscribe(data =>{
      console.log(data);
      this.rooms.set(data.content);
      //this.rooms = data.content;
    });
  }
*/
}
