import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { FeaturedPropertiesComponent } from "../featured-properties/featured-properties.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomListParams } from '../../models/room-list-params';
import { AddressService, AdminAreaResponse } from '../../services/address.service';

@Component({
  selector: 'app-properties-sidebar',
  imports: [FeaturedPropertiesComponent, ReactiveFormsModule],
  templateUrl: './properties-sidebar.component.html',
  styleUrl: './properties-sidebar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertiesSidebarComponent {

  filterChange = output<RoomListParams>();
  private addressService = inject(AddressService);
  private base: RoomListParams = {
    page: 0, 
    size: 4, 
    priceMin: null, 
    priceMax: null,
    provinceCode: null as any,
    districtCode: null as any,
    communeCode: null as any,
    villageCode: null as any
  }

  private fb = inject(FormBuilder);

  // dropdown data
  provinces: AdminAreaResponse[] = [];
  districts: AdminAreaResponse[] = [];
  communes: AdminAreaResponse[] = [];
  villages: AdminAreaResponse[] = [];

  form = this.fb.group({
    // location
    provinceCode: this.fb.control<string | ''>(''),
    districtCode: this.fb.control<string | ''>({ value: '', disabled: true }),
    communeCode:  this.fb.control<string | ''>({ value: '', disabled: true }),
    villageCode:  this.fb.control<string | ''>({ value: '', disabled: true }),

    priceMin: this.fb.control<number | null> (null, {validators: [Validators.min(0)]}),
    priceMax: this.fb.control<number | null> (null, {validators: [Validators.min(0)]}),
  })

  applyFilterOld(){
    //console.log("Apply is clicked")
    //console.log(this.form.getRawValue())
    const {priceMin, priceMax}  = this.form.getRawValue();
    this.filterChange.emit({...this.base, priceMin: priceMin ?? null, priceMax: priceMax ?? null})
  }

   // --- apply filter ---
  applyFilter(): void {
    const raw = this.form.getRawValue();
    const params: RoomListParams = {
      ...this.base,
      priceMin: raw.priceMin ?? null,
      priceMax: raw.priceMax ?? null,
      // include location picks (null if not chosen)
      provinceCode: raw.provinceCode || null,
      districtCode: raw.districtCode || null,
      communeCode:  raw.communeCode || null,
      villageCode:  raw.villageCode || null
    } as RoomListParams;

    this.filterChange.emit(params);
  }

  constructor() {
    this.loadProvinces();
  }

  trackByCode = (_: number, item: AdminAreaResponse): string => {
    return item.code;
  };

  // --- cascading handlers ---
  private loadProvinces(): void {
    this.addressService.getProvinces().subscribe((list) => {
      this.provinces = list ?? [];
    });
  }

  onProvinceChange(): void {
    const provinceCode = this.form.get('provinceCode')?.value as string;

    this.districts = [];
    this.communes = [];
    this.villages = [];
    this.form.patchValue({ districtCode: '', communeCode: '', villageCode: '' });

    if (provinceCode && provinceCode.length > 0) {
      this.form.get('districtCode')?.enable();
      this.form.get('communeCode')?.disable();
      this.form.get('villageCode')?.disable();

      this.addressService.getDistricts(provinceCode).subscribe((list) => {
        this.districts = list ?? [];
      });
    } else {
      this.form.get('districtCode')?.disable();
      this.form.get('communeCode')?.disable();
      this.form.get('villageCode')?.disable();
    }
  }

  onDistrictChange(): void {
    const districtCode = this.form.get('districtCode')?.value as string;

    this.communes = [];
    this.villages = [];
    this.form.patchValue({ communeCode: '', villageCode: '' });

    if (districtCode && districtCode.length > 0) {
      this.form.get('communeCode')?.enable();
      this.form.get('villageCode')?.disable();

      this.addressService.getCommunes(districtCode).subscribe((list) => {
        this.communes = list ?? [];
      });
    } else {
      this.form.get('communeCode')?.disable();
      this.form.get('villageCode')?.disable();
    }
  }

  onCommuneChange(): void {
    const communeCode = this.form.get('communeCode')?.value as string;

    this.villages = [];
    this.form.patchValue({ villageCode: '' });

    if (communeCode && communeCode.length > 0) {
      this.form.get('villageCode')?.enable();

      this.addressService.getVillages(communeCode).subscribe((list) => {
        this.villages = list ?? [];
      });
    } else {
      this.form.get('villageCode')?.disable();
    }
  }
}
