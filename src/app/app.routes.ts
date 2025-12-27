import { Routes } from '@angular/router';
import { SectionComponent } from './components/section/section.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { FavoritesRoomComponent } from './components/favorites-room/favorites-room.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'properties', pathMatch: 'full'
    },
    {
        path: 'properties', component: SectionComponent
    },
    { path: 'favorites', component: FavoritesRoomComponent },

    {
        path: 'properties/:id', component: PropertyDetailsComponent
    },
    {
        path: '**', redirectTo: 'properties'
    },

];
