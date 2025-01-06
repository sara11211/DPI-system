import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarLaboComponent } from './sidebar.component';

describe('SidebarLaboComponent', () => {
  let component: SidebarLaboComponent;
  let fixture: ComponentFixture<SidebarLaboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarLaboComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarLaboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
