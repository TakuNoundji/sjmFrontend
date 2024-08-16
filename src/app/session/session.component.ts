import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterActivityComponent } from '../footer-activity/footer-activity.component';
import { ActivityComponent } from '../activity/activity.component';
import { HeaderActivityComponent } from '../header-activity/header-activity.component';

@Component({
  selector: 'app-session',
  standalone: true,
  imports: [TableModule, SidebarComponent, FooterActivityComponent, ActivityComponent, HeaderActivityComponent],
  templateUrl: './session.component.html',
  styleUrl: './session.component.css'
})
export class SessionComponent {

  customers: any;

}
