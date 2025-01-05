import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueGraphiquesComponent } from './historique-graphiques.component';

describe('HistoriqueGraphiquesComponent', () => {
  let component: HistoriqueGraphiquesComponent;
  let fixture: ComponentFixture<HistoriqueGraphiquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueGraphiquesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoriqueGraphiquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
