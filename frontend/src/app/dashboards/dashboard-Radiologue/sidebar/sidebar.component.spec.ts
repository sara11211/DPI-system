import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarRadioComponent } from './sidebar.component';

describe('SidebarRadioComponent', () => {
  let component: SidebarRadioComponent;
  let fixture: ComponentFixture<SidebarRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarRadioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
