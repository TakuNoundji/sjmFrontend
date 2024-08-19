import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ActivityComponent } from '../activity/activity.component';
import { HeaderActivityComponent } from '../header-activity/header-activity.component';
import { FooterActivityComponent } from '../footer-activity/footer-activity.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SeanceService } from '../services/seance.service';
import { DialogModule } from 'primeng/dialog';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-seance',
  standalone: true,
  imports: [],
  templateUrl: './seance.component.html',
  styleUrl: './seance.component.css',
  providers: [SeanceService]
})
export class SeanceComponent {

  
  fileDialog = false;
  search="";
  loading=false;
  seanceDialog=false;
  isGettingAll = true;
  senddingRequest = false;
  isUpdating = false;


  seanceList = Array();

  customers : any ;
  constructor(private seanceService : SeanceService){

    this.getSea();

  }


  
  getSea(): void{
    this.seanceService.getAlSeance().toPromise().then((data) => {
      this.seanceList = data;
      console.log(data);
      

    })
  }

}
