import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierBilanBioComponent } from './modifier-bilan-bio.component';

describe('ModifierBilanBioComponent', () => {
  let component: ModifierBilanBioComponent;
  let fixture: ComponentFixture<ModifierBilanBioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierBilanBioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifierBilanBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
