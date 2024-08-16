
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidemenuComponent } from "../shared/components/sidemenu/sidemenu.component";
import { TableComponent } from '../shared/components/table/table.component';
import { ModuleListComponent } from '../shared/components/module-list/module-list.component';

@Component({
    standalone: true,
    templateUrl: './main.component.html',
    styleUrl: './main.component.css',
    imports: [
        RouterModule,
        SidemenuComponent,
        TableComponent,
        ModuleListComponent
    ]
})
export default class MainComponent {

}

