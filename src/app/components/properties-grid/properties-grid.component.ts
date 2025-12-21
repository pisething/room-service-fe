import { Component, input } from '@angular/core';
import { PropertyCardComponent } from '../property-card/property-card.component';
import { RoomVM } from '../../models/room-vm';

@Component({
  selector: 'app-properties-grid',
  imports: [PropertyCardComponent],
  templateUrl: './properties-grid.component.html',
  styleUrl: './properties-grid.component.css'
})
export class PropertiesGridComponent {
  rooms = input.required<RoomVM[]>();
}
