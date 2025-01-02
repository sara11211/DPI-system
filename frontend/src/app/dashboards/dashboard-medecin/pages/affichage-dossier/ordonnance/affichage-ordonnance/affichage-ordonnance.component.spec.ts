import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichagOrdonnanceComponent } from './affichage-ordonnance.component';

describe('AffichagOrdonnanceComponent', () => {
  let component: AffichagOrdonnanceComponent;
  let fixture: ComponentFixture<AffichagOrdonnanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffichagOrdonnanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffichagOrdonnanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
