import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDemandesBbComponent } from './liste-demandes-bb.component';

describe('ListeDemandesBbComponent', () => {
  let component: ListeDemandesBbComponent;
  let fixture: ComponentFixture<ListeDemandesBbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeDemandesBbComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeDemandesBbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
