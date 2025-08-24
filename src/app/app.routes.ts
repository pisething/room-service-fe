import { Routes } from '@angular/router';
import { SectionComponent } from './components/section/section.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'properties', pathMatch: 'full' },
  { path: 'properties', component: SectionComponent },            // list page
  { path: 'properties/:id', component: PropertyDetailsComponent },   // details page (no resolver variant)
  // If you want resolver-based prefetch:
  // { path: 'properties/:id', component: PropertyDetailsPageComponent, resolve: { room: roomResolver } },
  { path: '**', redirectTo: 'properties' }
];
