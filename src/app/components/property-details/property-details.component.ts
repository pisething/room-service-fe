import { Component, DestroyRef, inject, signal } from '@angular/core';
import { PropertyGalleryComponent } from "../property-gallery/property-gallery.component";
import { PropertyDescriptionComponent } from "../property-description/property-description.component";
import { PropertyAmenitiesComponent } from "../property-amenities/property-amenities.component";
import { PropertyMapComponent } from "../property-map/property-map.component";
import { PropertyOverviewComponent } from "../property-overview/property-overview.component";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { map, filter, tap, switchMap, catchError, of } from 'rxjs';
import { Room } from '../../models/room';
import { RoomService } from '../../services/room.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-property-details',
  imports: [PropertyGalleryComponent, 
    PropertyDescriptionComponent, 
    PropertyAmenitiesComponent, 
    PropertyMapComponent, 
    PropertyOverviewComponent],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.css'
})
export class PropertyDetailsComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private roomService = inject(RoomService);
  private destroyRef = inject(DestroyRef);
  private viewport = inject(ViewportScroller);

  room = signal<Room | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  constructor() {
    // When route becomes /properties/:id, reset to top
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        this.viewport.scrollToPosition([0, 0]);
      });
      
    this.route.paramMap
      .pipe(
        map(p => p.get('id')),
        filter((id): id is string => !!id),
        tap(() => { // side effect
          this.loading.set(true);
          this.error.set(null);
        }),
        switchMap(id =>
          this.roomService.getById(id).pipe(
            catchError(err => {
              this.error.set(err?.message ?? 'Failed to load room');
              return of(null);
            })
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(r => {
        this.room.set(r);
        this.loading.set(false);
      });
  }

  backToResults() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

    if (returnUrl) {
      
      this.router.navigateByUrl(returnUrl).then(() => {
        const key = `scroll:${returnUrl}`;
        const y = Number(sessionStorage.getItem(key) ?? '0');
        requestAnimationFrame(() =>
          window.scrollTo({ top: y, behavior: 'instant' as any })
        );
      });

      return;
    }

    // fallback
    this.router.navigateByUrl('/properties');
  }
}
