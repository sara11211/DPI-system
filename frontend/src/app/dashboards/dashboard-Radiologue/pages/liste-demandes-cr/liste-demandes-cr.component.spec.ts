import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDemandesCRComponent } from './liste-demandes-cr.component';

describe('ListeDemandesCRComponent', () => {
  let component: ListeDemandesCRComponent;
  let fixture: ComponentFixture<ListeDemandesCRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeDemandesCRComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeDemandesCRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
