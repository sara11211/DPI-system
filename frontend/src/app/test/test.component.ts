import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  constructor(public authService: AuthService) {}

}
