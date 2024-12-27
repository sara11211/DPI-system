import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichageBilanRadioComponent } from './affichage-bilan-radio.component';

describe('AffichageBilanRadioComponent', () => {
  let component: AffichageBilanRadioComponent;
  let fixture: ComponentFixture<AffichageBilanRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffichageBilanRadioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffichageBilanRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
