import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AffichageDossierComponentPatient } from './affichage-dossier.component';



describe('ListeDossierComponent', () => {
  let component: AffichageDossierComponentPatient;
  let fixture: ComponentFixture<AffichageDossierComponentPatient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffichageDossierComponentPatient]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffichageDossierComponentPatient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
