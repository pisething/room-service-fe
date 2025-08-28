import { Component, signal } from '@angular/core';
import { PropertiesHeaderComponent } from "../properties-header/properties-header.component";
import { PropertiesGridComponent } from "../properties-grid/properties-grid.component";
import { PropertiesListComponent } from "../properties-list/properties-list.component";
import { PaginationComponent } from "../pagination/pagination.component";
import { PropertiesSidebarComponent } from "../properties-sidebar/properties-sidebar.component";
import { RoomListParams } from '../../models/room-list-params';

@Component({
  selector: 'app-section',
  imports: [PropertiesHeaderComponent, PropertiesGridComponent, PropertiesListComponent, PaginationComponent, PropertiesSidebarComponent],
  templateUrl: './section.component.html',
  styleUrl: './section.component.css'
})
export class SectionComponent {
  filters = signal<RoomListParams>({ page: 0, size: 12, sort: 'createdAt,desc', priceMin: null, priceMax: null });

  onFiltersChanged(f: RoomListParams) {
    console.log(f)
    this.filters.set(f); // or merge if needed
  }
}
