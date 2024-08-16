import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import IServiceBase from '../../interfaces/IService';

@Component({
  selector: 'app-pending-list-to-approve',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pending-list-to-approve.component.html',
  styleUrl: './pending-list-to-approve.component.css'
})
export class PendingListToApproveComponent implements OnInit {
  @Input() service!: IServiceBase;
  @Input() serviceMethod!: string;
  dataList: any[] = [];

  constructor(private router: Router) { }

  async ngOnInit() {
    await this.getList();
  }
  async getList() {
    try {
      const result = await this.service.execute(this.serviceMethod, null);
      this.dataList = result;
    } catch (error) {
    }
  }
  async approveMember(data) {
    try {
      await this.service.execute('approveMemberAndUser', data);
    } catch (error) {
    } finally {
      this.getList();
    }
  }
}
