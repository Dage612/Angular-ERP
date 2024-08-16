import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleListComponent } from '../../../shared/components/module-list/module-list.component';
import GeneralService from '../../../services/GeneralService';
import { catchError, of, tap } from 'rxjs';
import { CompanyModules } from '../../../shared/models/CompanyModels/CompanyModulesModel';


@Component({
  selector: 'app-modules-views',
  standalone: true,
  imports: [CommonModule, ModuleListComponent],
  templateUrl: './modules-views.component.html',
  styleUrl: './modules-views.component.css',
  providers: [GeneralService]
})

export default class ModulesViewsComponent implements OnInit {
  modules: any[] = [];

  constructor(private generalService: GeneralService) {
  }
  ngOnInit(): void {
    this.init();
  }

  init() {
    this.generalService.getCompanyModules().
      pipe(
        tap((modules: CompanyModules[]) => {
          console.log(modules);
          modules.forEach((module) => this.modules.push({ id: module.id, name: module.name, route: module.route, img: module.img }));
        }), catchError(() => of(null))
      ).subscribe();
  }
}
