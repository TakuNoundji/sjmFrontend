import { Component } from '@angular/core';
import { HeaderActivityComponent } from '../header-activity/header-activity.component';
import { FooterActivityComponent } from '../footer-activity/footer-activity.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [HeaderActivityComponent,
    FooterActivityComponent,
    SidebarComponent
  ],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent {

}
