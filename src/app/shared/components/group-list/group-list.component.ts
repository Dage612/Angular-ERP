import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import IServiceBase from '../../interfaces/IService';

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css'], // Asegúrate de tener un "styleUrls" correcto
})
export class GroupListComponent implements OnInit { // Implementa OnInit
  @Input() service!: IServiceBase;
  @Input() serviceMethod!: string;
  faArrowRight = faArrowCircleRight;
  dataList: any[] = [];


  constructor() { }

  async ngOnInit() { // Usa ngOnInit para operaciones iniciales
    await this.getList(); // Llama a getList cuando el componente se inicializa
  }

  async getList() {
    try {
      const result = await this.service.execute(this.serviceMethod, null);
      this.dataList = result;
    } catch (error) {
    }
  }
}
