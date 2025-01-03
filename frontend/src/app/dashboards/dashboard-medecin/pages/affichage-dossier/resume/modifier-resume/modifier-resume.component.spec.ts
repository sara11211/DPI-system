import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierResumeComponent } from './modifier-resume.component';

describe('ModifierResumeComponent', () => {
  let component: ModifierResumeComponent;
  let fixture: ComponentFixture<ModifierResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierResumeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifierResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
