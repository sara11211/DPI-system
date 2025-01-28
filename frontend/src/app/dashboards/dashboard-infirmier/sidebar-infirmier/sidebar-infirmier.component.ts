import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar-infirmier',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './sidebar-infirmier.component.html',
  styleUrl: './sidebar-infirmier.component.css'
})
export class SidebarInfirmierComponent {

}
