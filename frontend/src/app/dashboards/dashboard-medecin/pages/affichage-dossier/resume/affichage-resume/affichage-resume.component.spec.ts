import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichageResumeComponent } from './affichage-resume.component';

describe('AffichageResumeComponent', () => {
  let component: AffichageResumeComponent;
  let fixture: ComponentFixture<AffichageResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffichageResumeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffichageResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
