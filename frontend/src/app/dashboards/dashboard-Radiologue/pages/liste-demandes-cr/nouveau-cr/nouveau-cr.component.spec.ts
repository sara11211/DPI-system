import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauCrComponent } from './nouveau-cr.component';

describe('NouveauCrComponent', () => {
  let component: NouveauCrComponent;
  let fixture: ComponentFixture<NouveauCrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NouveauCrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NouveauCrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
