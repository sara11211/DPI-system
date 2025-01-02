import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheDossierNssRadioComponent } from './recherche-dossier-nss.component';

describe('RechercheDossierNssRadioComponent', () => {
  let component: RechercheDossierNssRadioComponent;
  let fixture: ComponentFixture<RechercheDossierNssRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechercheDossierNssRadioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RechercheDossierNssRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
