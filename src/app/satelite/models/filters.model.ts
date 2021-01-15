export interface FiltersType {
  [key :string]: string;
}

export interface Filter {
    label: string;
    value: string | boolean;
    filterStr: string;
}

export interface AvailableFilters {
  caption: string;
  filters: Filter[];
}
