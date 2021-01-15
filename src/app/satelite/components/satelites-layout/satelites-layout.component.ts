import { Component, OnInit } from '@angular/core';
import { SateliteService } from '../../services/satelite.service';
import { FiltersType, AvailableFilters } from '../../models/filters.model';
import { Satelite } from '../../models/satelite.model';
import { ActivatedRoute, Router } from '@angular/router';
import { makeStateKey, TransferState } from '@angular/platform-browser';

const SPACEX_FILTERS: any[] = [
  {
    caption: 'Launch Year',
    filters: [
      {
        label: '2006',
        value: '2006',
        filterStr: 'launch_year=2006',
      },
      {
        label: '2007',
        value: '2007',
        filterStr: 'launch_year=2007',
      },
      {
        label: '2008',
        value: '2008',
        filterStr: 'launch_year=2008',
      },
      {
        label: '2009',
        value: '2009',
        filterStr: 'launch_year=2009',
      },
      {
        label: '2010',
        value: '2010',
        filterStr: 'launch_year=2010',
      },
      {
        label: '2011',
        value: '2011',
        filterStr: 'launch_year=2011',
      },
      {
        label: '2012',
        value: '2012',
        filterStr: 'launch_year=2012',
      },
      {
        label: '2013',
        value: '2013',
        filterStr: 'launch_year=2013',
      },
      {
        label: '2014',
        value: '2014',
        filterStr: 'launch_year=2014',
      },
      {
        label: '2015',
        value: '2015',
        filterStr: 'launch_year=2015',
      },
      {
        label: '2016',
        value: '2016',
        filterStr: 'launch_year=2016',
      },
      ,
      {
        label: '2017',
        value: '2017',
        filterStr: 'launch_year=2017',
      },
      {
        label: '2018',
        value: '2018',
        filterStr: 'launch_year=2018',
      },
      {
        label: '2019',
        value: '2019',
        filterStr: 'launch_year=2019',
      },
      {
        label: '2020',
        value: '2020',
        filterStr: 'launch_year=2020',
      },
    ],
  },
  {
    caption: 'Successful Launch',
    filters: [
      {
        label: 'True',
        value: true,
        filterStr: `launch_success=${true}`,
      },
      {
        label: 'False',
        value: false,
        filterStr: `launch_success=${false}`,
      },
    ],
  },
  {
    caption: 'Successful Landing',
    filters: [
      {
        label: 'True',
        value: true,
        filterStr: `land_success=${true}`,
      },
      {
        label: 'False',
        value: false,
        filterStr: `land_success=${false}`,
      },
    ],
  },
];

@Component({
  selector: 'app-satelites-layout',
  templateUrl: './satelites-layout.component.html',
  styleUrls: ['./satelites-layout.component.css']
})
export class SatelitesLayoutComponent implements OnInit {
  satelitesData: Satelite[];
  spaceXFilters: AvailableFilters[] = [...SPACEX_FILTERS];
  appliedFilters: FiltersType = {
    launch_year: '',
    launch_success: '',
    land_success: '',
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sateliteService: SateliteService,
    private transferState: TransferState) { }

  ngOnInit(): void {
    let myTransferStateKey = makeStateKey<any>("myDatas");
    if(this.transferState.hasKey(myTransferStateKey)) {
        this.satelitesData = this.transferState.get(myTransferStateKey, []);
        this.transferState.remove(myTransferStateKey);
    }else {
        this.fetchSatelitesData(this.createQueryStr(this.appliedFilters), myTransferStateKey);
    }

    this.route.queryParams.subscribe((params: Partial<FiltersType>) => {
      this.appliedFilters = {...this.appliedFilters , ...params} as any;
      if(Object.keys(params).length) {
        this.fetchSatelitesData(this.createQueryStr(this.appliedFilters));
      }
    })
  }

  fetchSatelitesData(queryStr: string, stateKey?: any) {
    this.sateliteService.getSatelites(queryStr).subscribe((res: Satelite[]) => {
      console.log('res', res);
      this.satelitesData = res;
      this.transferState.set(stateKey, this.satelitesData);
    })
  }

  handleNavigation = (filterStr:string) => {
    const filters: FiltersType = { ...this.appliedFilters };
    const [filterName, filterValue] = filterStr.split('=');
    filters[filterName] = filterValue;

    const queryStr = this.createQueryStr(filters);
    // const params = this.createQueryParams(filters);
    this.appliedFilters = filters;
    this.updateRoute(filters);
    this.fetchSatelitesData(queryStr);
  };

  createQueryStr = (filters : FiltersType) => {
    let queryStr = '';
    for (let key in filters) {
      if (filters[key]) {
        queryStr += `&${key}=${filters[key]}&`;
      }
    }
    return queryStr.slice(0, -1);
  };

  // createQueryParams = (filters: FiltersType): any => {
  //   let queryParams = {};
  //   for (let key in filters) {
  //     if (filters[key]) {
  //       queryParams[key] = filters[key];
  //     }
  //   }
  //   return queryParams;
  // };

  updateRoute = (filters: FiltersType) => {
    let appliedFilters = this.getAppliedFilters(filters);
    this.router.navigate([], { queryParams: {...appliedFilters}})
  };

  getAppliedFilters(filters: FiltersType): Partial<FiltersType> {
    let appliedFilters: Partial<FiltersType> = {};
    for(let key in filters) {
      if(filters[key]) {
        appliedFilters[key] = filters[key];
      }
    }
    return appliedFilters;
  }
}
