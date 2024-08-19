import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderActivityComponent } from '../header-activity/header-activity.component';
import { FooterActivityComponent } from '../footer-activity/footer-activity.component';
import { ActivityComponent } from '../activity/activity.component';
import { AdminComponent } from '../admin/admin.component';
import { CandidatService } from '../services/candidat.service';
import { log } from 'console';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService, MessageService, PrimeIcons } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule, NgFor, NgIf, SlicePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-candidat',
  standalone: true,
  imports: [TableModule,NgFor,DialogModule,FormsModule, SidebarComponent,ReactiveFormsModule, CommonModule, NgIf, HeaderActivityComponent,SlicePipe, FooterActivityComponent, ToastModule, RouterLink, RouterLinkActive],
  templateUrl: './candidat.component.html',
  styleUrl: './candidat.component.css',
  providers: [CandidatService, MessageService, ConfirmationService]
})
export class CandidatComponent {





  fileDialog = false;
search="";
loading=false;
candidatDialog=false;
isGettingAll = true;
senddingRequest = false;
isUpdating = false;



Candidat = {
  code: '',
  nom : '',
  prenom: '',
  matricule: '',
  sexe: '',
  moyenneBacProb: '',
  observations: '',
  age: '',

  session_id : ''

}



annuler(): void{
  if (this.isUpdating === false) {
    this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'operation annuler', life: 3000 });
  }
  this.candidatDialog = false;
}

candidatForm = this.formBuilder.group({
  nom: new FormControl('', [Validators.required]),
  prenom: new FormControl('', [Validators.required]),
  matricule: new FormControl('', [Validators.required]),
  sexe: new FormControl('', [Validators.required]),
  moyenneBacProb: new FormControl('', [Validators.required]),
  observations: new FormControl('', [Validators.required]),
  age: new FormControl('', [Validators.required]),
  session: new FormControl('', [Validators.required])



})


candidatList=Array();
  SessionList= Array();



  customers : any;

  constructor(
    private candidatService : CandidatService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private sessionService : SessionService


  ){
    // this.customers;
    this.getCand();
    this.getSes();
  }



  getCand(): void{
    this.candidatService.getAllCandidat().toPromise().then((data)=> {
      this.candidatList = data;
      console.log(data);
      this.isGettingAll = false
      
    });
  }

  createCandidat(): void{
    this.candidatDialog = true;
    this.isUpdating = false;
    this.Candidat = {
      code: '',
      nom : '',
      prenom: '',
      matricule: '',
      sexe: '',
      moyenneBacProb: '',
      observations: '',
      age: '',
    
      session_id : ''
    
    }

  }

  resetRequestVariable(message: string): void{
    this.senddingRequest = false;
    this.candidatDialog = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Confirmer',
      detail: message,
      life: 3000
    });
    this.Candidat = {
      code: '',
      nom : '',
      prenom: '',
      matricule: '',
      sexe: '',
      moyenneBacProb: '',
      observations: '',
      age: '',
    
      session_id : ''
    
    }
  }



  getSes(): void{

    this.isGettingAll = true;

    this.sessionService.getAllSession().toPromise().then((data) => {
      this.SessionList = data;
      console.log(data);
      this.isGettingAll = false;
    },(res)=>{
      this.isGettingAll = false;
    })
  }

    
saveCandi(e: Event): void {
  e.preventDefault();

  // return;


  const session = this.SessionList.filter((it) => {
    return +it.id == +this.Candidat.session_id
  })

  const cand = {
    nom: this.Candidat.nom,
    prenom: this.Candidat.prenom,
    matricule: this.Candidat.matricule,
    sexe: this.Candidat.sexe,
    moyenneBacProb: this.Candidat.moyenneBacProb,
    observations: this.Candidat.observations,
    age: this.Candidat.age,
    session_id: this.Candidat.session_id,



  };

  console.log(this.Candidat);
  
  // initiate the request
  this.senddingRequest = true;

  if (this.isUpdating){
    this.candidatService.update({
      code: this.Candidat.code,
      ...cand
    }).toPromise().then((data) => {
      this.getCand()

      // console.log(this.getCand());
      
      if(data != null){
        this.resetRequestVariable("Ce candidat a été modifié avec success");
      }else{
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: "une erreur est survenue lors de la modification", life: 3000 });
      }
    },
    (res) => {
      this.senddingRequest = false;
      this.candidatDialog = false;
      // tslint:disable-next-line:max-line-length
      this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la modification', life: 3000 });
    });
  }else{
    this.candidatService.create(cand).toPromise().then((data) => {

      console.log(data);

      console.log(cand);
      
      
      if(data != null){
        // this.candidatList.push(data);
        this.resetRequestVariable("candidat créé  avec success");
        // this.getAllYears()
      }else{
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: "une erreur est survenue lors de la creation surement une probleme de date", life: 3000 });
      }
    },
    (res) => {
      this.senddingRequest = false;
      this.candidatDialog=false;
  this.candidatDialog = false;
      // tslint:disable-next-line:max-line-length
      this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la creation', life: 3000 });
    });
  }

}


onSelectSession(e: Event):void{
  //@ts-ignore
let values = e.target.value;
// this.cand.session_id = values

}

}
