import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDossierComponent } from './liste-dossiers.component';

describe('ListeDossierComponent', () => {
  let component: ListeDossierComponent;
  let fixture: ComponentFixture<ListeDossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeDossierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
