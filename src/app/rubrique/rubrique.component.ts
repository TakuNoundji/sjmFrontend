import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderActivityComponent } from '../header-activity/header-activity.component';
import { FooterActivityComponent } from '../footer-activity/footer-activity.component';

@Component({
  selector: 'app-rubrique',
  standalone: true,
  imports: [SidebarComponent, HeaderActivityComponent, FooterActivityComponent],
  templateUrl: './rubrique.component.html',
  styleUrl: './rubrique.component.css'
})
export class RubriqueComponent {

}
