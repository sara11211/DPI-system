import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatRadioComponent } from './resultat-radio.component';

describe('ResultatRadioComponent', () => {
  let component: ResultatRadioComponent;
  let fixture: ComponentFixture<ResultatRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultatRadioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultatRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
