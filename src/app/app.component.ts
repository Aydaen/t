import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CarouselComponent} from "./shared/components/carousel/carousel.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CarouselComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'T';
}
