import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauBilanBioComponent } from './nouveau-bilan-bio.component';

describe('NouveauBilanBioComponent', () => {
  let component: NouveauBilanBioComponent;
  let fixture: ComponentFixture<NouveauBilanBioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NouveauBilanBioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NouveauBilanBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
