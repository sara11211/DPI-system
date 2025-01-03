import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierBilanRadioComponent } from './modifier-bilan-radio.component';

describe('ModifierBilanRadioComponent', () => {
  let component: ModifierBilanRadioComponent;
  let fixture: ComponentFixture<ModifierBilanRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierBilanRadioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifierBilanRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
