import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueBilansComponent } from './historique-bilans.component';

describe('HistoriqueBilansComponent', () => {
  let component: HistoriqueBilansComponent;
  let fixture: ComponentFixture<HistoriqueBilansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueBilansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoriqueBilansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
