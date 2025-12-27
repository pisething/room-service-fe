import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RoomVM } from '../../models/room-vm';

@Component({
  selector: 'app-properties-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './properties-list.component.html',
  styleUrl: './properties-list.component.css'
})
export class PropertiesListComponent {
  rooms = input.required<RoomVM[]>();
  favoriteToggle = output<string>(); // roomId
}
