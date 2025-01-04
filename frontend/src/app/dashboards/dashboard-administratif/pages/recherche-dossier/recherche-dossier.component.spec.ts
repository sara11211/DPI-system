import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheDossierComponent } from './recherche-dossier.component';

describe('RechercheDossierComponent', () => {
  let component: RechercheDossierComponent;
  let fixture: ComponentFixture<RechercheDossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechercheDossierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RechercheDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
