import { Component, inject, input, output, signal } from '@angular/core';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { Room } from '../../models/room';
import { RoomListParams } from '../../models/room-list-params';
import { RoomService } from '../../services/room.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-properties-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './properties-list.component.html',
  styleUrl: './properties-list.component.css'
})
export class PropertiesListComponent {
filter = input.required<RoomListParams>();
  pageInfo = output<{ totalPages: number; totalElements: number }>();

  private roomService = inject(RoomService);

  rooms = signal<Room[]>([]);

  constructor() {
    toObservable(this.filter)
      .pipe(
        switchMap(f => this.roomService.list(f)),
        takeUntilDestroyed()
      )
      .subscribe(page => {
        this.rooms.set(page.content ?? []);
        this.pageInfo.emit({
          totalPages: page.totalPage ?? 0,
          totalElements: page.totalElements ?? 0
        });
      });
  }

  // ------- UI helpers using your real fields --------

  mainPhoto(room: Room): string {
    const urls = room.photoUrls ?? [];
    return urls.length > 0 ? urls[0] : 'assets/img/real-estate/property-exterior-1.webp';
  }

  priceText(room: Room): string {
    const price = room.price ?? 0;
    const code = room.currencyCode ?? 'USD';

    if (!room.price || room.price <= 0) {
      return 'Contact';
    }

    try {
      return new Intl.NumberFormat(undefined, { style: 'currency', currency: code }).format(price);
    } catch {
      return `${price} ${code}`;
    }
  }

  addressText(room: Room): string {
    const a: any = room.address ?? {};
    const parts = [
      a.line1,
      a.villageName,
      a.communeName,
      a.districtName,
      a.provinceName
    ].filter(Boolean);
    return parts.join(', ');
  }

  availableText(room: Room): string {
    const from = room.availableFrom;
    if (!from) {
      return '';
    }
    const d = new Date(from);
    if (Number.isNaN(d.getTime())) {
      return '';
    }
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' });
  }

  statusText(room: Room): string {
    if (room.status === 'AVAILABLE') {
      return 'Available';
    }
    if (room.status === 'RENTED') {
      return 'Rented';
    }
    return 'Hidden';
  }

  statusClass(room: Room): string {
    if (room.status === 'AVAILABLE') {
      return 'badge-available';
    }
    if (room.status === 'RENTED') {
      return 'badge-rented';
    }
    return 'badge-hidden';
  }

  amenityIcons(room: Room): Array<{ icon: string; label: string }> {
    const r: any = room;
    const items = [
      { ok: !!r.hasWiFi, icon: 'bi-wifi', label: 'WiFi' },
      { ok: !!r.hasAirConditioner, icon: 'bi-snow', label: 'AC' },
      { ok: !!r.hasParking, icon: 'bi-car-front', label: 'Parking' },
      { ok: !!r.hasKitchen, icon: 'bi-egg-fried', label: 'Kitchen' },
      { ok: !!r.hasPrivateBathroom, icon: 'bi-droplet', label: 'Private bath' },
      { ok: !!r.hasWashingMachine, icon: 'bi-bucket', label: 'Washer' },
      { ok: !!r.hasBalcony, icon: 'bi-border', label: 'Balcony' },
      { ok: !!r.hasElevator, icon: 'bi-building', label: 'Elevator' }
    ];
    return items.filter(x => x.ok).map(x => ({ icon: x.icon, label: x.label })).slice(0, 6);
  }

}
