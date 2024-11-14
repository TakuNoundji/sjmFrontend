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
  selector: 'app-candidats-elimines',
  standalone: true,
  imports: [TableModule,NgFor,DialogModule,FormsModule,ConfirmDialogModule, SidebarComponent,ReactiveFormsModule, CommonModule, NgIf, HeaderActivityComponent,SlicePipe, FooterActivityComponent, ToastModule, RouterLink, RouterLinkActive],
  templateUrl: './candidats-elimines.component.html',
  styleUrl: './candidats-elimines.component.css',
  providers: [CandidatService, MessageService, ConfirmationService]
})
export class CandidatsEliminesComponent {

  candidatList=Array();
  isGettingAll = true;
  loading=false;
  search="";

  stringOne: string = 'passable';
  stringTwo: string = 'AAAA';






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

  dropCandidat(id: string, 	matricule:string): void{
    this.confirmationService.confirm({
      message: 'Etes vous sur de vouloir supprimer  ' + 	matricule + '? noter que ça suppression inplique la suppression de tout les données qui lui sont liées',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isGettingAll = true;
        this.candidatService.delete(id).toPromise().then((data) => {
          this.isGettingAll = false;
          console.log(data);
          if(data != null){
            this.messageService.add({ severity: 'error', summary: 'erreur', detail: data, life: 5000 });
          }else{
            // tslint:disable-next-line:max-line-length
            this.messageService.add({ severity: 'success', summary: 'success', detail: `candidat N° ${id} supprimer avec succès`, life: 5000 });
            // tslint:disable-next-line:triple-equals
            this.candidatList = this.candidatList.filter( it  => it.code != id );
          }
        }, (res)=>{
          this.isGettingAll = false
          console.log(res);
          this.messageService.add({ severity: 'error', summary: 'erreur', detail: res.error.error, life: 5000 });
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'operation annuler', life: 5000 });
      }
    });
  }
  

}
