import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheDossierRadioComponent } from './recherche-dossier.component';

describe('RechercheDossierRadioComponent', () => {
  let component: RechercheDossierRadioComponent;
  let fixture: ComponentFixture<RechercheDossierRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechercheDossierRadioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RechercheDossierRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
