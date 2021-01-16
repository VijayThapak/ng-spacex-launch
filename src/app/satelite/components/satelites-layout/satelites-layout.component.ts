import { Component, OnDestroy, OnInit } from '@angular/core';
import { SateliteService } from '../../services/satelite.service';
import { FiltersType, AvailableFilters } from '../../models/filters.model';
import { Satelite } from '../../models/satelite.model';
import { ActivatedRoute, Router } from '@angular/router';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
export class SatelitesLayoutComponent implements OnInit, OnDestroy {
  satelitesData: Satelite[] = [];
  spaceXFilters: AvailableFilters[] = [...SPACEX_FILTERS];
  appliedFilters: FiltersType = {
    launch_year: '',
    launch_success: '',
    land_success: '',
  }

  private loadingFlag = false;
  private destroy$ = new Subject();

  /**
   *Creates an instance of SatelitesLayoutComponent.
   * @param {Router} router
   * @param {ActivatedRoute} route
   * @param {SateliteService} sateliteService
   * @param {TransferState} transferState
   * @memberof SatelitesLayoutComponent
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sateliteService: SateliteService,
    private transferState: TransferState) { }

  /**
   * Angular lifecycle
   *
   * @memberof SatelitesLayoutComponent
   */
  ngOnInit(): void {
    let myTransferStateKey = makeStateKey<any>("myDatas");
    if(this.transferState.hasKey(myTransferStateKey)) {
        this.satelitesData = this.transferState.get(myTransferStateKey, []);
        this.transferState.remove(myTransferStateKey);
    }else {
        this.fetchSatelitesData(this.createQueryStr(this.appliedFilters), myTransferStateKey);
    }

    this.subscribeParams();
  }

  /**
   * subsribe query params
   *
   * @memberof SatelitesLayoutComponent
   */
  subscribeParams() {
    // subscribing query params
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params: Partial<FiltersType>) => {
      this.appliedFilters = {...this.appliedFilters , ...params} as any;
      if(this.loadingFlag || Object.keys(params).length) {
        this.fetchSatelitesData(this.createQueryStr(this.appliedFilters));
      }
      this.loadingFlag = true;
    })
  }

  /**
   * to fetch the satelites data
   *
   * @param {string} queryStr
   * @param {*} [stateKey]
   * @memberof SatelitesLayoutComponent
   */
  fetchSatelitesData(queryStr: string, stateKey?: any) {
    this.sateliteService.getSatelites(queryStr).subscribe((res: Satelite[]) => {
      if(stateKey) {
        this.transferState.set(stateKey, res);
      }
      this.satelitesData = res;
    }, (err) =>{
      console.error("Something went wrong...", err);
    })
  }

  /**
   * handles the filters navigation
   *
   * @memberof SatelitesLayoutComponent
   */
  handleNavigation = (filterStr:string) => {
    const filters: FiltersType = { ...this.appliedFilters };
    const [filterName, filterValue] = filterStr.split('=');
    if(filters[filterName] === filterValue) {
      filters[filterName] = '';
    } else {
      filters[filterName] = filterValue;
    }

    this.appliedFilters = filters;
    this.updateRoute(filters);
  };

  /**
   * generates the query strings
   *
   * @memberof SatelitesLayoutComponent
   */
  createQueryStr = (filters : FiltersType) => {
    let queryStr = '';
    for (let key in filters) {
      if (filters[key]) {
        queryStr += `&${key}=${filters[key]}&`;
      }
    }
    return queryStr.slice(0, -1);
  };

  /**
   * updates the browser url
   *
   * @memberof SatelitesLayoutComponent
   */
  updateRoute = (filters: FiltersType) => {
    let appliedFilters = this.getAppliedFilters(filters);
    this.router.navigate([], { queryParams: {...appliedFilters}})
  };

  /**
   * filters the applied filters
   *
   * @param {FiltersType} filters
   * @returns {Partial<FiltersType>}
   * @memberof SatelitesLayoutComponent
   */
  getAppliedFilters(filters: FiltersType): Partial<FiltersType> {
    let appliedFilters: Partial<FiltersType> = {};
    for(let key in filters) {
      if(filters[key]) {
        appliedFilters[key] = filters[key];
      }
    }
    return appliedFilters;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
