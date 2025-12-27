import { Component } from '@angular/core';
import { FavoritesStore } from '../../services/favorite.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
constructor(public readonly favorites: FavoritesStore) {}
}
