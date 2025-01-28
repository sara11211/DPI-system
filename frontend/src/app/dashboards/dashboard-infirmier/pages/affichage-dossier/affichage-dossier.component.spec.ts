import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AffichageDossierComponentInfirmier } from './affichage-dossier.component';



describe('ListeDossierComponent', () => {
  let component: AffichageDossierComponentInfirmier;
  let fixture: ComponentFixture<AffichageDossierComponentInfirmier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffichageDossierComponentInfirmier]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffichageDossierComponentInfirmier);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
