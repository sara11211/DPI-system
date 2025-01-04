import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeOrdonnancesComponent } from './liste-ordonnances.component';

describe('ListeOrdonnancesComponent', () => {
  let component: ListeOrdonnancesComponent;
  let fixture: ComponentFixture<ListeOrdonnancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeOrdonnancesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeOrdonnancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
