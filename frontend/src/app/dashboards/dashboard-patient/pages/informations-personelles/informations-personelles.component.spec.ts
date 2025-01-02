import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationsPersonellesPatientComponent } from './informations-personelles.component';

describe('InformationsPersonellesPatientComponent', () => {
  let component: InformationsPersonellesPatientComponent;
  let fixture: ComponentFixture<InformationsPersonellesPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationsPersonellesPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformationsPersonellesPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
