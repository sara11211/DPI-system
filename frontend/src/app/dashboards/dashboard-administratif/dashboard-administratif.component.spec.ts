import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAdministratifComponent } from './dashboard-administratif.component';

describe('DashboardAdministratifComponent', () => {
  let component: DashboardAdministratifComponent;
  let fixture: ComponentFixture<DashboardAdministratifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAdministratifComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardAdministratifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
