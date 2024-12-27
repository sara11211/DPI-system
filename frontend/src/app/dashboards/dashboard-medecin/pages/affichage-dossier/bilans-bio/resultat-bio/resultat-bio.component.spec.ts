import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatBioComponent } from './resultat-bio.component';

describe('ResultatBioComponent', () => {
  let component: ResultatBioComponent;
  let fixture: ComponentFixture<ResultatBioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultatBioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultatBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
