import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card-container',
  imports: [],
  templateUrl: './card-container.html',
  styleUrl: './card-container.css',
})
export class CardContainer {
  title = input.required<string>();
}