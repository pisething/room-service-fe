import { Component } from '@angular/core';
import { TitleComponent } from "../title/title.component";
import { SectionComponent } from "../section/section.component";

@Component({
  selector: 'app-main',
  imports: [TitleComponent, SectionComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
