import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faUserPlus, faArrowRight, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SectionTabsComponent } from '../../../../shared/components/section-tabs/section-tabs.component';
import { ActiveTabService } from '../../../../shared/components/section-tabs/section-tabs-service.component';
import { GroupListComponent } from '../../../../shared/components/group-list/group-list.component';
import MemberService from '../../../../services/MemberService';
import { PendingListToApproveComponent } from '../../../../shared/components/pending-list-to-approve/pending-list-to-approve.component';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, SectionTabsComponent, GroupListComponent, PendingListToApproveComponent],
  templateUrl: './support.component.html',
  styleUrl: './support.component.css',
  providers: [ActiveTabService, MemberService]
})
export default class SupportComponent implements OnInit {
  faCoffee = faUserPlus;
  faArrowRight = faArrowCircleRight;
  dynamicTabs!: any[];

  constructor(public activeTabService: ActiveTabService, public memberService: MemberService) { }

  ngOnInit(): void {
    this.dynamicTabs = [
      { title: 'Miembros', content: 'tab1-content' },
      { title: 'Pendientes', content: 'tab2-content' },
      { title: 'Tickets', content: 'tab3-content' },
    ];
  }
}
