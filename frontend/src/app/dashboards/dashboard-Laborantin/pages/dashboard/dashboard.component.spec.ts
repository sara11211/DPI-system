import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLaboComponent } from './dashboard.component';

describe('DashboardLaboComponent', () => {
  let component: DashboardLaboComponent;
  let fixture: ComponentFixture<DashboardLaboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardLaboComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardLaboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
