import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelleOrdonnanceComponent } from './nouvelle-ordonnance.component';

describe('NouvelleOrdonnanceComponent', () => {
  let component: NouvelleOrdonnanceComponent;
  let fixture: ComponentFixture<NouvelleOrdonnanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NouvelleOrdonnanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NouvelleOrdonnanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
