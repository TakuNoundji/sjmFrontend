import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderActivityComponent } from '../header-activity/header-activity.component';
import { FooterActivityComponent } from '../footer-activity/footer-activity.component';
import { ActivityComponent } from '../activity/activity.component';
import { CandidatService } from '../services/candidat.service';
import { RubriqueService } from '../services/rubrique.service';
import { SessionService } from '../services/session.service';
import { SeanceService } from '../services/seance.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SidebarComponent, HeaderActivityComponent, FooterActivityComponent,ActivityComponent, RouterLink, RouterLinkActive],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  providers: [CandidatService,RubriqueService,SessionService,SeanceService]
})
export class AdminComponent {

  CandidatList=Array();
  rubriqueList = Array();
  sessionList= Array();
  seanceList = Array();




  constructor(
    private candidatService : CandidatService,
    private rubriqueService : RubriqueService,
    private sessionService : SessionService,
    private seanceService : SeanceService
  ){
    // this.customers;

    this.getCand();
    this.getRubrique();
    this.getSes();
    this.getSea();
    
  }




  getCand(): void{
    this.candidatService.getAllCandidat().toPromise().then((data)=> {
      this.CandidatList = data;
      console.log(data);
      
    });
  }

  getRubrique(): void{
    this.rubriqueService.getAllRubrique().toPromise().then((data) => {
      this.rubriqueList =data;
      console.log(data);
      
    })
  }

  getSes(): void{
    this.sessionService.getAllSession().toPromise().then((data) => {
      this.sessionList = data;
      console.log(data);
      

    })
  }

  getSea(): void{
    this.seanceService.getAlSeance().toPromise().then((data) => {
      this.seanceList = data;
      console.log(data);
      

    })
  }



}
