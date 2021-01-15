import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SateliteComponent } from './satelite.component';

describe('SateliteComponent', () => {
  let component: SateliteComponent;
  let fixture: ComponentFixture<SateliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SateliteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SateliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
