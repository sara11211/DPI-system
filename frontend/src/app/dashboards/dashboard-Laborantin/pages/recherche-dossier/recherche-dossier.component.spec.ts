import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheDossierLaboComponent } from './recherche-dossier.component';

describe('RechercheDossierLaboComponent', () => {
  let component: RechercheDossierLaboComponent;
  let fixture: ComponentFixture<RechercheDossierLaboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechercheDossierLaboComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RechercheDossierLaboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
