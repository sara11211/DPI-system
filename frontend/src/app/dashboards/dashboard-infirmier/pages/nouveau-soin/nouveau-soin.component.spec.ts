import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauSoinComponent } from './nouveau-soin.component';

describe('NouveauSoinComponent', () => {
  let component: NouveauSoinComponent;
  let fixture: ComponentFixture<NouveauSoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NouveauSoinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NouveauSoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
