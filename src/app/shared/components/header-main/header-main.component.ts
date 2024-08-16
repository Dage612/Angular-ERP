import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidemenuComponent } from '../sidemenu/sidemenu.component';

@Component({
  selector: 'app-header-main',
  standalone: true,
  imports: [CommonModule, SidemenuComponent],
  templateUrl: './header-main.component.html',
  styleUrl: './header-main.component.css'
})
export class HeaderMainComponent {

  @Input() title!: string | undefined;

  constructor(private side: SidemenuComponent) { }

  toggleMenu() {
    this.side.openSidebar();
  }


}
