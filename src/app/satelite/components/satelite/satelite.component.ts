import { Component, Input, OnInit } from '@angular/core';
import { Satelite } from '../../models/satelite.model';

@Component({
  selector: 'app-satelite',
  templateUrl: './satelite.component.html',
  styleUrls: ['./satelite.component.css']
})
export class SateliteComponent implements OnInit {
  @Input() satelite: Satelite;

  constructor() { }

  ngOnInit(): void {
  }

}
