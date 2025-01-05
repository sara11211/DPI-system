import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheDossierQrLaboComponent } from './recherche-dossier-qr.component';

describe('RechercheDossierQrLaboComponent', () => {
  let component: RechercheDossierQrLaboComponent;
  let fixture: ComponentFixture<RechercheDossierQrLaboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechercheDossierQrLaboComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RechercheDossierQrLaboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
