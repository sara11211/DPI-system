import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichageSoinComponent } from './affichage-soin.component';

describe('AffichageSoinComponent', () => {
  let component: AffichageSoinComponent;
  let fixture: ComponentFixture<AffichageSoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffichageSoinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffichageSoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
