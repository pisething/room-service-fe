import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Room } from '../../models/room';
import { RoomVM } from '../../models/room-vm';
import { toRoomVM } from '../../utils/room-formatters';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.css'
})
export class PropertyCardComponent {

  room = input.required<Room>();

  // Build VM once (all formatting is centralized in room-formatters)
  vm = computed<RoomVM>(() => toRoomVM(this.room()));

  // UI-only helpers
  hasMultiplePhotos = computed(() => this.vm().photoCount > 1);

  
}


