import { CommonModule, NgFor, NgIf, SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderActivityComponent } from '../header-activity/header-activity.component';
import { FooterActivityComponent } from '../footer-activity/footer-activity.component';
import { ToastModule } from 'primeng/toast';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CandidatService } from '../services/candidat.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-candidats-elligibles-orale',
  standalone: true,
  imports: [TableModule,NgFor,DialogModule,FormsModule,ConfirmDialogModule, SidebarComponent,ReactiveFormsModule, CommonModule, NgIf, HeaderActivityComponent,SlicePipe, FooterActivityComponent, ToastModule, RouterLink, RouterLinkActive],
  templateUrl: './candidats-elligibles-orale.component.html',
  styleUrl: './candidats-elligibles-orale.component.css',
  providers: [CandidatService, MessageService, ConfirmationService]

})
export class CandidatsElligiblesOraleComponent {

  candidatList=Array();
  isGettingAll = true;
  loading=false;
  search="";





  constructor(    private candidatService : CandidatService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService, 
  ){
    this.getCand();


  }

  getCand(): void{
    this.candidatService.getAllCandidat().toPromise().then((data)=> {
      this.candidatList = data;
      console.log(data);
      this.isGettingAll = false
      
    });
  }

}
