import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheDossierNssLaboComponent } from './recherche-dossier-nss.component';

describe('RechercheDossierNssLaboComponent', () => {
  let component: RechercheDossierNssLaboComponent;
  let fixture: ComponentFixture<RechercheDossierNssLaboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechercheDossierNssLaboComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RechercheDossierNssLaboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
