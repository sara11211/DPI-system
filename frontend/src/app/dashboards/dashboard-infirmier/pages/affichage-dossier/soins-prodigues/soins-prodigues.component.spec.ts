import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoinsProdiguesComponentInfirmier} from './soins-prodigues.component'

describe('SoinsProdiguesComponentInfirmier', () => {
  let component: SoinsProdiguesComponentInfirmier;
  let fixture: ComponentFixture<SoinsProdiguesComponentInfirmier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoinsProdiguesComponentInfirmier]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SoinsProdiguesComponentInfirmier);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
