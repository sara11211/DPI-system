import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheDossierQrRadioComponent } from './recherche-dossier-qr.component';

describe('RechercheDossierQrRadioComponent', () => {
  let component: RechercheDossierQrRadioComponent;
  let fixture: ComponentFixture<RechercheDossierQrRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechercheDossierQrRadioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RechercheDossierQrRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
