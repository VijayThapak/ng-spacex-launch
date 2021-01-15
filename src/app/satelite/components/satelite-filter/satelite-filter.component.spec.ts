import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SateliteFilterComponent } from './satelite-filter.component';

describe('SateliteFilterComponent', () => {
  let component: SateliteFilterComponent;
  let fixture: ComponentFixture<SateliteFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SateliteFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SateliteFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
