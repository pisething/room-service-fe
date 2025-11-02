import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FeaturedPropertiesComponent } from '../featured-properties/featured-properties.component';
import { AddressService, AdminAreaResponse } from '../../services/address.service';
import { RoomListParams } from '../../models/room-list-params';

@Component({
  selector: 'app-properties-sidebar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FeaturedPropertiesComponent],
  templateUrl: './properties-sidebar.component.html',
  styleUrl: './properties-sidebar.component.css'
})
export class PropertiesSidebarComponent {
  filterChange = output<RoomListParams>();

  private fb = inject(FormBuilder);
  private address = inject(AddressService);

  // Create controls with initial disabled state.
  form = this.fb.group({
    provinceCode: this.fb.control<string>(''),
    districtCode: this.fb.control<string>({ value: '', disabled: true }),
    communeCode:  this.fb.control<string>({ value: '', disabled: true }),
    villageCode:  this.fb.control<string>({ value: '', disabled: true }),
    priceMin: this.fb.control<number | null>(null, { validators: [Validators.min(0)] }),
    priceMax: this.fb.control<number | null>(null, { validators: [Validators.min(0)] })
  });

  // For convenience (avoids string keys & typos)
  get provinceCtrl() { return this.form.controls.provinceCode; }
  get districtCtrl()  { return this.form.controls.districtCode; }
  get communeCtrl()   { return this.form.controls.communeCode; }
  get villageCtrl()   { return this.form.controls.villageCode; }

  provinces: AdminAreaResponse[] = [];
  districts: AdminAreaResponse[] = [];
  communes:  AdminAreaResponse[] = [];
  villages:  AdminAreaResponse[] = [];

  private base: RoomListParams = {
    page: 0, size: 4, priceMin: null, priceMax: null,
    provinceCode: null as any, districtCode: null as any,
    communeCode:  null as any, villageCode:  null as any
  };

  constructor() {
    // Load provinces once
    this.address.getProvinces().subscribe(list => this.provinces = list ?? []);
  }

  // Province -> Districts
  onProvinceChange(code: string) {
    this.districts = []; this.communes = []; this.villages = [];
    this.form.patchValue({ districtCode: '', communeCode: '', villageCode: '' });

    if (!code) {
      //  Toggle disabled state via the control API
      this.districtCtrl.disable();
      this.communeCtrl.disable();
      this.villageCtrl.disable();
      return;
    }

    this.districtCtrl.enable();
    this.communeCtrl.disable();
    this.villageCtrl.disable();

    this.address.getDistricts(code).subscribe(list => this.districts = list ?? []);
  }

  // District -> Communes
  onDistrictChange(code: string) {
    this.communes = []; 
    this.villages = [];
    this.form.patchValue({ communeCode: '', villageCode: '' });

    if (!code) {
      this.communeCtrl.disable();
      this.villageCtrl.disable();
      return;
    }

    this.communeCtrl.enable();
    this.villageCtrl.disable();

    this.address.getCommunes(code).subscribe(list => this.communes = list ?? []);
  }

  // Commune -> Villages
  onCommuneChange(code: string) {
    this.villages = [];
    this.form.patchValue({ villageCode: '' });

    if (!code) {
      this.villageCtrl.disable();
      return;
    }

    this.villageCtrl.enable();
    this.address.getVillages(code).subscribe(list => this.villages = list ?? []);
  }

  // Emit filters (use undefined for “not set” to satisfy strict types)
  applyFilter() {
    const raw = this.form.getRawValue();
    this.filterChange.emit({
      ...this.base,
      priceMin: raw.priceMin ?? null,
      priceMax: raw.priceMax ?? null,
      provinceCode: raw.provinceCode || undefined,
      districtCode: raw.districtCode || undefined,
      communeCode:  raw.communeCode  || undefined,
      villageCode:  raw.villageCode  || undefined
    });
  }
}
