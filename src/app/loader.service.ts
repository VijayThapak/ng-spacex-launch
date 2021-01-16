import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderState = new Subject<boolean>();

  constructor() { }

  /**
   * loaderState getter
   *
   * @returns
   * @memberof LoaderService
   */
  getLoaderSubject() {
    return this.loaderState;
  }

  /**
   * loaderState setter
   *
   * @param {boolean} state
   * @memberof LoaderService
   */
  setLoaderSubject(state: boolean) {
    this.loaderState.next(state);
  }

  /**
   *toggle the state of loader
   *
   * @param {boolean} state
   * @memberof LoaderService
   */
  toggleLoader(state: boolean) {
    this.setLoaderSubject(state);
  }
}
