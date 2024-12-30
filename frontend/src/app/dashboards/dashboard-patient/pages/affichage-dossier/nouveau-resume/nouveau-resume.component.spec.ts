import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauResumeComponent } from './nouveau-resume.component';

describe('NouveauResumeComponent', () => {
  let component: NouveauResumeComponent;
  let fixture: ComponentFixture<NouveauResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NouveauResumeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NouveauResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
