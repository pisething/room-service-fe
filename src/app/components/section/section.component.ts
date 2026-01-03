import { Component, signal } from '@angular/core';

import { PropertiesHeaderComponent } from '../properties-header/properties-header.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { PropertiesSidebarComponent } from '../properties-sidebar/properties-sidebar.component';
import { PropertiesFilterBarComponent } from '../properties-filter-bar/properties-filter-bar.component';
import { PropertiesActiveFiltersComponent } from '../properties-active-filters/properties-active-filters.component';
import { PropertiesGridComponent } from '../properties-grid/properties-grid.component';
import { PropertiesListComponent } from '../properties-list/properties-list.component';

import { SortOption, ViewMode } from '../../models/sort-option';
import { PropertiesFacade } from '../../services/properties.facade';
import { RoomListParams } from '../../models/room-list-params';

@Component({
  selector: 'app-section',
  imports: [
    PropertiesHeaderComponent,
    PaginationComponent,
    PropertiesSidebarComponent,
    PropertiesFilterBarComponent,
    PropertiesActiveFiltersComponent,
    PropertiesGridComponent,
    PropertiesListComponent
  ],
  templateUrl: './section.component.html',
  styleUrl: './section.component.css'
})
export class SectionComponent {
  // UI-only state
  viewMode = signal<ViewMode>('grid');
  sort = signal<SortOption>('NEWEST');

  constructor(public readonly facade: PropertiesFacade) {}

  onViewModeChange(mode: ViewMode) {
    this.viewMode.set(mode);
  }

  onSortChange(sort: SortOption) {
    this.sort.set(sort);
    const backendSort = this.toBackendSort(sort);
    this.facade.patchFilter({ ...backendSort, page: 0 });
  }

  private toBackendSort(sort: SortOption): Pick<RoomListParams, 'sortBy' | 'direction'> {
    switch (sort) {
      case 'PRICE_ASC':
        return { sortBy: 'price', direction: 'asc' };
      case 'PRICE_DESC':
        return { sortBy: 'price', direction: 'desc' };
      case 'MOST_VIEWED':
        return { sortBy: 'viewCount', direction: 'desc' };
      case 'NEWEST':
      default:
        return { sortBy: 'createdAt', direction: 'desc' };
    }
  }
}
