import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RoomVM } from '../../models/room-vm';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.css'
})
export class PropertyCardComponent {
  router = inject(Router);

  vm = input.required<RoomVM>();

  favoriteToggle = output<void>();

  // UI-only helpers
  hasMultiplePhotos = computed(() => this.vm().photoCount > 1);

  
}


