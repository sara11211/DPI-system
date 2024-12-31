import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheDossierNssComponent } from './recherche-dossier-nss.component';

describe('RechercheDossierNssComponent', () => {
  let component: RechercheDossierNssComponent;
  let fixture: ComponentFixture<RechercheDossierNssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechercheDossierNssComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RechercheDossierNssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
