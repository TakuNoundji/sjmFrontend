import { Component } from '@angular/core';
import { HeaderActivityComponent } from '../header-activity/header-activity.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterActivityComponent } from '../footer-activity/footer-activity.component';

@Component({
  selector: 'app-ordonnancement',
  standalone: true,
  imports: [HeaderActivityComponent, SidebarComponent, FooterActivityComponent],
  templateUrl: './ordonnancement.component.html',
  styleUrl: './ordonnancement.component.css'
})
export class OrdonnancementComponent {

}
