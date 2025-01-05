import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauBbComponent } from './nouveau-bb.component';

describe('NouveauBbComponent', () => {
  let component: NouveauBbComponent;
  let fixture: ComponentFixture<NouveauBbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NouveauBbComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NouveauBbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
