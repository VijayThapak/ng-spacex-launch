import { Component, Input, OnInit, Output, EventEmitter  } from '@angular/core';
import { AvailableFilters, FiltersType } from '../../models/filters.model';

@Component({
  selector: 'app-satelite-filter',
  templateUrl: './satelite-filter.component.html',
  styleUrls: ['./satelite-filter.component.css']
})
export class SateliteFilterComponent implements OnInit {
  @Input() appliedFilters: FiltersType;
  @Input() spaceXFilters: AvailableFilters[];

  @Output() navigate = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  isActive(value: any, groupId: number) {
    let active = false;
    switch(groupId) {
        case 0: active = this.appliedFilters['launch_year'] === value; break;
        case 1: active = this.appliedFilters['launch_success'] === value.toString(); break;
        case 2: active = this.appliedFilters['land_success'] === value.toString(); break;
    }
    return active;
  }

  handleNavigation(filterStr: string) {
    this.navigate.emit(filterStr);
  }

}
