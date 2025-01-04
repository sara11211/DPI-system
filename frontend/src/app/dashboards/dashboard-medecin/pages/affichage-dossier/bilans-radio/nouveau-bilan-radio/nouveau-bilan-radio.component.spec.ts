import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauBilanRadioComponent } from './nouveau-bilan-radio.component';

describe('NouveauBilanRadioComponent', () => {
  let component: NouveauBilanRadioComponent;
  let fixture: ComponentFixture<NouveauBilanRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NouveauBilanRadioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NouveauBilanRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
