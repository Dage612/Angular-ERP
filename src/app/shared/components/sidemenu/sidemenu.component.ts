import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleRight, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { HeaderMainComponent } from '../header-main/header-main.component';
import { routes } from '../../../app.routes';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/AuthService';



@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule, HeaderMainComponent, CommonModule],
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
  providers: [AuthService]
})

export class SidemenuComponent implements OnInit {
  headerTitle: string = '';
  faCoffee = faCoffee;
  faAngleDoubleLeft = faAngleRight;
  sidebarVisible = true;
  rotateArrowClose = false;
  rotateArrowOpen = false;
  dashRoutes: any[] = [];
  // En el constructor
  constructor(private router: Router, private route: ActivatedRoute, private cdr: ChangeDetectorRef, private authService: AuthService) { }

  // Este método podría ser una función separada para mejorar la legibilidad
  private getDashRoutes() {
    const commonRoutes = routes
      .flatMap(route => route.children ?? [])
      .filter(route => route && route.path);

    if (this.authService.IsSupport) {
      return commonRoutes; // Incluye todas las rutas
    } else {
      // Excluir la ruta de "support" para usuarios sin privilegios
      return commonRoutes.filter(route => route.path !== 'support');
    }
  }

  ngOnInit() {
    // Suscripción a eventos de enrutamiento para cambiar el encabezado
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateHeaderTitle();
      }
    });

    this.dashRoutes = this.getDashRoutes();
  }

  updateHeaderTitle() {
    const childRoutes = this.route.children;
    childRoutes.forEach(childRoute => {
      this.headerTitle = childRoute.snapshot.data['title'];
      this.cdr.detectChanges(); // Way to trigger changes for updating the title
    });

    if (this.headerTitle == null) {
      this.headerTitle = this.route.snapshot.data['title'];
      this.cdr.detectChanges();  // // Way to trigger changes for updating the title
    }
  }

  getYear(): number {
    return new Date().getFullYear();
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    this.rotateArrowClose = !this.rotateArrowClose;
    this.rotateArrowOpen = false;
  }

  openSidebar() {
    this.sidebarVisible = true;
    this.rotateArrowOpen = !this.rotateArrowOpen;
    this.rotateArrowClose = false;
  }

  logOut() {
    this.router.navigate(['/login']);
    this.authService.logOut();
  }
}
