import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AffichageDossierComponent } from './affichage-dossier.component';



describe('ListeDossierComponent', () => {
  let component: AffichageDossierComponent;
  let fixture: ComponentFixture<AffichageDossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffichageDossierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffichageDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
