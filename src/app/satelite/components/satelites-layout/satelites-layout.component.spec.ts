import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatelitesLayoutComponent } from './satelites-layout.component';

describe('SatelitesLayoutComponent', () => {
  let component: SatelitesLayoutComponent;
  let fixture: ComponentFixture<SatelitesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SatelitesLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SatelitesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
