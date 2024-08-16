import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-module-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './module-list.component.html',
  styleUrl: './module-list.component.css'
})
export class ModuleListComponent {
  @Input() modules: any[] = [];

  constructor(private router: Router) { }

  navigate(route: string): void {
    this.router.navigate([route]);
  }
}
