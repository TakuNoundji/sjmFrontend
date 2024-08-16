import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ActivityComponent } from '../activity/activity.component';
import { HeaderActivityComponent } from '../header-activity/header-activity.component';
import { FooterActivityComponent } from '../footer-activity/footer-activity.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-seance',
  standalone: true,
  imports: [TableModule, ActivityComponent, HeaderActivityComponent, FooterActivityComponent, SidebarComponent],
  templateUrl: './seance.component.html',
  styleUrl: './seance.component.css'
})
export class SeanceComponent {

  customers : any ;
  constructor(){

  }

}
