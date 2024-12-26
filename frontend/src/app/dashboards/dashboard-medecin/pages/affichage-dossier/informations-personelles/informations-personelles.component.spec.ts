import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationsPersonellesComponent } from './informations-personelles.component';

describe('InformationsPersonellesComponent', () => {
  let component: InformationsPersonellesComponent;
  let fixture: ComponentFixture<InformationsPersonellesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationsPersonellesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformationsPersonellesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
