import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderActivityComponent } from '../header-activity/header-activity.component';
import { FooterActivityComponent } from '../footer-activity/footer-activity.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SidebarComponent, HeaderActivityComponent, FooterActivityComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
