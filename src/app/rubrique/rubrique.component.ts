import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderActivityComponent } from '../header-activity/header-activity.component';
import { FooterActivityComponent } from '../footer-activity/footer-activity.component';
import { RubriqueService } from '../services/rubrique.service';
import { TableModule } from 'primeng/table';
import { CommonModule, NgIf, SlicePipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-rubrique',
  standalone: true,
  imports: [SidebarComponent,ToastModule, HeaderActivityComponent, FooterActivityComponent, TableModule, SlicePipe,NgIf,DialogModule, CommonModule,   ReactiveFormsModule, FormsModule],
  templateUrl: './rubrique.component.html',
  styleUrl: './rubrique.component.css',
  providers: [RubriqueService, MessageService, ConfirmationService]
})
export class RubriqueComponent {

  fileDialog = false;
  search="";
  loading=false;
  rubriqueDialog=false;
  isGettingAll = true;
  senddingRequest = false;
  isUpdating = false;
  


Rubrique = {
  code: '',
  nombreDeCandidatsParPassage: '',
  pause : '',
  dureeDePassage: '',
  heureDeDebut: '',
  heureDeFin: '',
  nomDeLaRubrique: '',
  note: '',
  coefficient: '',
  noteEliminatoire: '',


};



annuler(): void{
  if (this.isUpdating === false) {
    this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'operation annuler', life: 3000 });
  }
  this.rubriqueDialog = false;
}


rubriqueForm = this.formBuilder.group({
  nombreDeCandidatsParPassage: new FormControl('', [Validators.required]),
  dureeDePassage: new FormControl('', [Validators.required]),
  pause: new FormControl('', [Validators.required]),
  heureDeDebut: new FormControl('', [Validators.required]),
  heureDeFin: new FormControl('', [Validators.required]),
  nomDeLaRubrique: new FormControl('', [Validators.required]),
  note: new FormControl('', [Validators.required]),
  coefficient: new FormControl('', [Validators.required]),
  noteEliminatoire: new FormControl('', [Validators.required]),







});

  rubriqueList = Array();


  constructor(private rubriqueService : RubriqueService,

    private formBuilder : FormBuilder,
    private confirmationService : ConfirmationService,
    private messageService : MessageService
  ){
    this.getRubrique();
  }


  getRubrique(): void{
    this.rubriqueService.getAllRubrique().toPromise().then((data) => {
      this.rubriqueList =data;
      console.log(data);
      
    })
  }


  createRub(): void{
    this.rubriqueDialog = true;
    this.isUpdating = false;
    this.Rubrique = {
      code: '',
      nombreDeCandidatsParPassage: '',
      pause: '',
      dureeDePassage: '',
      heureDeDebut: '',
      heureDeFin: '',
      nomDeLaRubrique: '',
      note: '',
      coefficient: '',
      noteEliminatoire: '',
    
    };
  
    console.log(this.Rubrique);
  }

  
saveRubri(e: Event): void {
  e.preventDefault();

  // return;

  const rub = {
    nombreDeCandidatsParPassage: this.Rubrique.nombreDeCandidatsParPassage,
    dureeDePassage: this.Rubrique.dureeDePassage,
    pause: this.Rubrique.pause,
    heureDeDebut: this.Rubrique.heureDeDebut,
    heureDeFin: this.Rubrique.heureDeFin,
    nomDeLaRubrique: this.Rubrique.nomDeLaRubrique,
    note: this.Rubrique.note,
    coefficient: this.Rubrique.coefficient,
    noteEliminatoire: this.Rubrique.noteEliminatoire,



  };
  // initiate the request
  this.senddingRequest = true;

  if (this.isUpdating){
    this.rubriqueService.update({
      code: this.Rubrique.code,
      ...rub
    }).toPromise().then((data) => {
      this.getRubrique()
      if(data != null){
        this.resetRequestVariable("Cette modifiée avec success");
      }else{
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: "une erreur est survenue lors de la modification", life: 3000 });
      }
    },
    (res) => {
      this.senddingRequest = false;
      this.rubriqueDialog = false;
      // tslint:disable-next-line:max-line-length
      this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la modification', life: 3000 });
    });
  }else{
    this.rubriqueService.create(rub).toPromise().then((data) => {
      if(data != null){
        this.rubriqueList.push(data);
        this.resetRequestVariable("Rubrique de pack crée avec success");
        // this.getAllYears()
      }else{
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: "une erreur est survenue lors de la creation surement une probleme de date", life: 3000 });
      }
    },
    (res) => {
      this.senddingRequest = false;
      this.rubriqueDialog=false;
  this.rubriqueDialog = false;
      // tslint:disable-next-line:max-line-length
      this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la creation', life: 3000 });
    });
  }

}

dropRubrique(id: string, libelle:string): void{
  this.confirmationService.confirm({
    message: 'Etes vous sur de vouloir supprimer  ' + libelle + '? noter que ça suppression inplique la supprission de tout les données qui lui sont liées',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.isGettingAll = true;
      this.rubriqueService.delete(id).toPromise().then((data) => {
        this.isGettingAll = false;
        console.log(data);
        if(data != null){
          this.messageService.add({ severity: 'error', summary: 'erreur', detail: data, life: 3000 });
        }else{
          // tslint:disable-next-line:max-line-length
          this.messageService.add({ severity: 'success', summary: 'success', detail: `option de pack N° ${id} supprimer avec success`, life: 3000 });
          // tslint:disable-next-line:triple-equals
          this.rubriqueList = this.rubriqueList.filter( it  => it.code != id );
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

resetRequestVariable(message: string): void{
  this.senddingRequest = false;
  this.rubriqueDialog = false;
  this.messageService.add({
    severity: 'success',
    summary: 'Confirmer',
    detail: message,
    life: 3000
  });
  this.Rubrique = {
    code: '',
    nombreDeCandidatsParPassage: '',
    pause: '',
    dureeDePassage: '',
    heureDeDebut: '',
    heureDeFin: '',
    nomDeLaRubrique: '',
    note: '',
      coefficient: '',
      noteEliminatoire: '',
  
  };
}


editRubrique(rubrique: any, e: Event): void{
  e.stopPropagation();

  // this.AcademicYear = academicYear;
  this.Rubrique.code = rubrique.code;
  this.Rubrique.nombreDeCandidatsParPassage = rubrique.nombreDeCandidatsParPassage;
  this.Rubrique.pause = rubrique.pause;
  this.Rubrique.dureeDePassage = rubrique.dureeDePassage;
  this.Rubrique.heureDeDebut = rubrique.heureDeDebut;
  this.Rubrique.heureDeFin = rubrique.heureDeFin;
  this.Rubrique.nomDeLaRubrique = rubrique.nomDeLaRubrique;
  this.Rubrique.note = rubrique.note;
  this.Rubrique.coefficient = rubrique.coefficient;
  this.Rubrique.noteEliminatoire = rubrique.noteEliminatoire;
  this.isUpdating = true;
  this.rubriqueDialog = true;
  // console.log(this.AcademicYear);
}



  

}
