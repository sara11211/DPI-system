import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRadioComponent } from './dashboard.component';

describe('DashboardRadioComponent', () => {
  let component: DashboardRadioComponent;
  let fixture: ComponentFixture<DashboardRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardRadioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
