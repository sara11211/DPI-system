import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoinsProdiguesComponentPatient} from './soins-prodigues.component'

describe('SoinsProdiguesComponentPatient', () => {
  let component: SoinsProdiguesComponentPatient;
  let fixture: ComponentFixture<SoinsProdiguesComponentPatient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoinsProdiguesComponentPatient]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SoinsProdiguesComponentPatient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
