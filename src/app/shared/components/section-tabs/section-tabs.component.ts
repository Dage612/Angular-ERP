import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveTabService } from './section-tabs-service.component';

@Component({
  selector: 'app-section-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-tabs.component.html',
  styleUrl: './section-tabs.component.css'
})
export class SectionTabsComponent implements OnInit {
  @Input() tabs: any[] = [];

  constructor(public activeTabService: ActiveTabService) {}

  ngOnInit(): void {}

  changeTab(index: number): void {
    this.activeTabService.changeTab(index);
  }
}