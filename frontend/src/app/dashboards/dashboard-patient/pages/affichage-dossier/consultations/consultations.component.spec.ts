import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationsComponentPatient } from './consultations.component';

describe('ConsultationsComponentPatient', () => {
  let component: ConsultationsComponentPatient;
  let fixture: ComponentFixture<ConsultationsComponentPatient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultationsComponentPatient]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultationsComponentPatient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
