import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, faSquareEnvelope, faTextSlash, faUnlockKeyhole, faUserLarge, faVoicemail } from '@fortawesome/free-solid-svg-icons';
import { ActiveTabService } from '../../../../../shared/components/section-tabs/section-tabs-service.component';
import { DynamicFormComponent } from '../../../../../shared/components/dynamic-form/dynamic-form.component';
import { SectionTabsComponent } from '../../../../../shared/components/section-tabs/section-tabs.component';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent, SectionTabsComponent, FontAwesomeModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  providers: [ActiveTabService]
})
export class UsersComponent {
  faCoffee = faCoffee;
  faUserLarge = faUserLarge;
  faUnlockKeyhole = faUnlockKeyhole;
  faSquareEnvelope = faSquareEnvelope;
  faTextSlash = faTextSlash;

  dynamicTabs = [
    { title: 'Registrar', content: 'tab1-content' },
    { title: 'Seguridad', content: 'tab2-content' },
    { title: 'Seguridad', content: 'tab2-content' },
    // ... Puedes agregar más pestañas según sea necesario
  ];

  customerInputsForm = [
    { type: 'text', name: 'Nombre', icon: faUserLarge },
    { type: 'text', name: 'Nombre de Usuario', icon: faUserLarge },
    { type: 'email', name: 'Correo', icon: faSquareEnvelope },
    { type: 'password', name: 'Contraseña', icon: faUnlockKeyhole },
    { type: 'password', name: 'Contraseña', icon: faUnlockKeyhole },
    { type: 'text', name: 'Señas', icon: faTextSlash },
    {
      type: 'select', name: 'Compañía', options: ['Fasauto', 'Atc', 'Vico', 'Baque', 'Sys'],
      multiple: true, design: 'checkbox', icon: faTextSlash
    },
    { type: 'datalist', name: 'Rol', options: ['Admin', 'Usuario', 'Invitado', 'LEFT'], icon: faTextSlash },

  ];

  constructor(public activeTabService: ActiveTabService) { }

  changeTab(index: number): void {
    this.activeTabService.changeTab(index);
  }
}