import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichageBilanBioComponent } from './affichage-bilan-bio.component';

describe('AffichageBilanBioComponent', () => {
  let component: AffichageBilanBioComponent;
  let fixture: ComponentFixture<AffichageBilanBioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffichageBilanBioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffichageBilanBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
