import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarInfirmierComponent } from './sidebar-infirmier.component';

describe('SidebarInfirmierComponent', () => {
  let component: SidebarInfirmierComponent;
  let fixture: ComponentFixture<SidebarInfirmierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarInfirmierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarInfirmierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
