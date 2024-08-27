import { Component, NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterActivityComponent } from '../footer-activity/footer-activity.component';
import { ActivityComponent } from '../activity/activity.component';
import { HeaderActivityComponent } from '../header-activity/header-activity.component';
import { SessionService } from '../services/session.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService, PrimeIcons } from 'primeng/api';
import { CommonModule, NgIf, SlicePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dialog, DialogModule } from 'primeng/dialog';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-session',
  standalone: true,
  imports: [TableModule,ToastModule,ConfirmDialogModule, SidebarComponent, FooterActivityComponent, ActivityComponent, HeaderActivityComponent,NgIf, SlicePipe,DialogModule, CommonModule,   ReactiveFormsModule, FormsModule],
  templateUrl: './session.component.html',
  styleUrl: './session.component.css',
  providers: [SessionService, MessageService, ConfirmationService]
})


export class SessionComponent {


   
fileDialog = false;
search="";
loading=false;
sessionDialog=false;
isGettingAll = true;
senddingRequest = false;
isUpdating = false;



Session = {
  code: '',
  libelle : '',
  annee : '',
  mois: ''

};




sessionForm = this.formBuilder.group({
  libelle: new FormControl('', [Validators.required]),
  annee: new FormControl('', [Validators.required]),

  mois: new FormControl('', [Validators.required]),
});



  sessionList= Array();

  customers: any;

  constructor(private sessionService : SessionService,
    private confirmationService : ConfirmationService,
    private messageService : MessageService,
    private formBuilder : FormBuilder
  ){

    this.getSes();

    


  }


  getSes(): void{
    this.sessionService.getAllSession().toPromise().then((data) => {
      this.sessionList = data;
      console.log(data);
      

    })
  }


  createSession(): void{
    this.sessionDialog = true;
    this.isUpdating = false;
    this.Session = {
      code: '',
      libelle : '',
      annee : '',
      mois: ''
    };

    console.log(this.Session);

  }

  editSession(session: any, e: Event): void{
    e.stopPropagation();
  
    this.Session.code = session.code;
    this.Session.libelle = session.libelle;
    this.Session.annee = session.annee;
    this.Session.mois = session.mois;

  
    this.isUpdating = true;
    this.sessionDialog = true;
  }

  dropSession(id: number, libelle:string): void{
    this.confirmationService.confirm({
      message: 'Etes vous sur de vouloir supprimer  ' + libelle + '? noter que ça suppression implique la supprimer de tout les données qui lui sont liées',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isGettingAll = true;
        this.sessionService.delete(id).toPromise().then((data) => {
          this.isGettingAll = false;
          console.log(data);
          if(data != null){
            this.messageService.add({ severity: 'error', summary: 'erreur', detail: data, life: 3000 });
          }else{
            // tslint:disable-next-line:max-line-length
            this.messageService.add({ severity: 'success', summary: 'success', detail: ` Session supprimée avec success`, life: 3000 });
            // tslint:disable-next-line:triple-equals
            this.sessionList = this.sessionList.filter( it  => it.code != id );
          }
        }, (res)=>{
          this.isGettingAll = false
          console.log(res);
          this.messageService.add({ severity: 'error', summary: 'erreur', detail: res.error.error, life: 3000 });
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'operation annuler', life: 3000 });
      }
    });
  }

  

saveSession(e: Event): void {
  e.preventDefault();

  // return;

  const ses = {
    libelle: this.Session.libelle,
    annee: this.Session.annee,
    mois: this.Session.mois,

  };

  console.log(this.Session);

  // initiate the request
  this.senddingRequest = true;
  // this.isUpdating =true;
  if (this.isUpdating){
    this.sessionService.update({
      code: this.Session.code,
      ...ses
    }).toPromise().then((data) => {
      this.getSes()
      if(data != null){
        this.resetRequestVariable("Session d'évaluation modifiée avec success");
      }else{
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: "une erreur est survenue lors de la modification", life: 3000 });
      }
    },
    (res) => {
      this.senddingRequest = false;
      this.sessionDialog = false;
      // tslint:disable-next-line:max-line-length
      this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la modification', life: 3000 });
    });
  }else{
    this.sessionService.create(ses).toPromise().then((data) => {
      if(data != null){
        this.sessionList.push(data);
        this.resetRequestVariable("Session créée avec succès");
        // this.getAllYears()
      }else{
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: "une erreur est survenue lors de la creation surement une probleme de date", life: 3000 });
      }
    },
    (res) => {
      this.senddingRequest = false;
      this.sessionDialog = false;
      // tslint:disable-next-line:max-line-length
      this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la creation', life: 3000 });
    });
  }

}

resetRequestVariable(message: string): void{
  this.senddingRequest = false;
  this.sessionDialog = false;
  this.messageService.add({
    severity: 'success',
    summary: 'Confirmer',
    detail: message,
    life: 3000
  });
  this.Session =  {
    code: '',
    libelle: '',
    annee: '',
    mois: '',
  };
}

annuler(): void{
  if (this.isUpdating === false) {
    this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'operation annuler', life: 3000 });
  }
  this.sessionDialog = false;
}

  

}
