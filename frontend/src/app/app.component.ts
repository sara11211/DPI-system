import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/utilities/button/button.component';
import { SidebarComponent } from './components/utilities/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, HeaderComponent, ButtonComponent, SidebarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'frontend';
  text = signal('Sauvegarder');
}
