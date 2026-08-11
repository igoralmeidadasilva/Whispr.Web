import { Component } from '@angular/core';
import { RecordButton } from "../../../components/ui/buttons/record-button/record-button";

@Component({
  selector: 'app-home',
  imports: [RecordButton],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
