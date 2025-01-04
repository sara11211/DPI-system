import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPatientComponent } from './sidebar.component';

describe('SidebarPatientComponent', () => {
  let component: SidebarPatientComponent;
  let fixture: ComponentFixture<SidebarPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
