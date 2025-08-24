import { Component, computed, EventEmitter, Input, Output, signal } from '@angular/core';
import { Room } from '../../models/room';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-room-card',
  imports: [CurrencyPipe],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.css'
})
export class RoomCardComponent {
 /**
   * Input property from parent (required).
   * This is the data that will be displayed on the card.
   */
  @Input({ required: true }) room!: Room;

  /**
   * Output events to notify the parent when user interacts.
   * - favorite: triggered when the heart button is clicked.
   * - view: triggered when the "View Details" button is clicked.
   */
  @Output() favorite = new EventEmitter<Room>();
  @Output() view = new EventEmitter<Room>();

  /**
   * Use a signal to store the current room so that computed properties
   * can react to changes.
   */
  currentRoom = signal<Room | null>(null);

  /**
   * Lifecycle hook - runs whenever input properties change.
   * Sets the currentRoom signal whenever parent passes a new Room.
   */
  ngOnChanges() {
    this.currentRoom.set(this.room);
  }

  /**
   * Computed property - returns the first image URL or a fallback.
   * Updates automatically if currentRoom changes.
   */
  imgSrc = computed(() =>
    this.currentRoom()?.imageUrl ?? 'assets/img/real-estate/property-exterior-1.webp'
  );

  /** Called when user clicks the favorite button. */
  onFavoriteClick() {
    if (this.currentRoom()) this.favorite.emit(this.currentRoom()!);
  }

  /** Called when user clicks the view details button. */
  onViewClick() {
    if (this.currentRoom()) this.view.emit(this.currentRoom()!);
  }
}
