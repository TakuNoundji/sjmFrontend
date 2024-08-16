import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderActivityComponent } from '../header-activity/header-activity.component';
import { FooterActivityComponent } from '../footer-activity/footer-activity.component';
import { ActivityComponent } from '../activity/activity.component';

@Component({
  selector: 'app-candidat',
  standalone: true,
  imports: [TableModule, SidebarComponent, HeaderActivityComponent, FooterActivityComponent, ActivityComponent],
  templateUrl: './candidat.component.html',
  styleUrl: './candidat.component.css'
})
export class CandidatComponent {


  customers : any;

  constructor(){
    this.customers;
  }

}
