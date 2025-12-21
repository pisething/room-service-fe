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
    this.facade.patchFilter({ sort, page: 0 });
  }
}
