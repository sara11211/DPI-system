import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheDossierQrComponent } from './recherche-dossier-qr.component';

describe('RechercheDossierQrComponent', () => {
  let component: RechercheDossierQrComponent;
  let fixture: ComponentFixture<RechercheDossierQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechercheDossierQrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RechercheDossierQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
