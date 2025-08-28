import { Component, inject, output, signal } from '@angular/core';
import { FeaturedPropertiesComponent } from "../featured-properties/featured-properties.component";
import { RoomListParams } from '../../models/room-list-params';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';

@Component({
  selector: 'app-properties-sidebar',
  imports: [FeaturedPropertiesComponent, ReactiveFormsModule],
  templateUrl: './properties-sidebar.component.html',
  styleUrl: './properties-sidebar.component.css'
})
export class PropertiesSidebarComponent {

  filtersChange = output<RoomListParams>();

  private fb = inject(FormBuilder);
  // allow nulls since these are optional filters
  form = this.fb.group({
    priceMin: this.fb.control<number | null>(null, { validators: [Validators.min(0)] }),
    priceMax: this.fb.control<number | null>(null, { validators: [Validators.min(0)] }),
  });

  // stable base (no null conflicts)
  private readonly base: RoomListParams = { page: 0, size: 2, sort: 'createdAt,desc', priceMin: null, priceMax: null };


  constructor() {
    // emit initial once
    queueMicrotask(() => this.filtersChange.emit({ ...this.base }));

    // emit on changes (debounced) — no spreading of `v`
    this.form.valueChanges.pipe(
      startWith(this.form.getRawValue()),
      debounceTime(250),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      map(raw => {
        const priceMin = raw.priceMin ?? null;
        const priceMax = raw.priceMax ?? null;
        return { ...this.base, priceMin, priceMax, page: 0 } as RoomListParams;
      })
    ).subscribe(params => this.filtersChange.emit(params));
  }

  apply() {
    const { priceMin, priceMax } = this.form.getRawValue();
    this.filtersChange.emit({ ...this.base, priceMin: priceMin ?? null, priceMax: priceMax ?? null, page: 0 });
  }

  clear() {
    this.form.reset({ priceMin: null, priceMax: null }, { emitEvent: true });
  }

}  

