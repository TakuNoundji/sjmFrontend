import { Component } from '@angular/core';
import { HeaderActivityComponent } from '../header-activity/header-activity.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterActivityComponent } from '../footer-activity/footer-activity.component';
import { NotesService } from '../services/notes.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CommonModule, NgIf, SlicePipe } from '@angular/common';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CandidatService } from '../services/candidat.service';
import { RubriqueService } from '../services/rubrique.service';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [SidebarComponent,ToastModule, ConfirmDialogModule, HeaderActivityComponent, FooterActivityComponent, TableModule, SlicePipe,NgIf,DialogModule, CommonModule,   ReactiveFormsModule, FormsModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
  providers: [NotesService, MessageService, CandidatService, RubriqueService, ConfirmationService]

})
export class NotesComponent {

  
  fileDialog = false;
  search="";
  loading=false;
  noteDialog=false;
  isGettingAll = true;
  senddingRequest = false;
  isUpdating = false;


  noteList = Array();
  candidatList = Array();
  rubriqueList = Array();


  Note = {
    code: '',
    candidat_id : '',
    rubrique_id: '',
    valeur: '',
  
  }


  annuler(): void{
    if (this.isUpdating === false) {
      this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'operation annuler', life: 5000 });
    }
    this.noteDialog = false;
  }



  constructor(
    private notesService : NotesService,
    private messageService : MessageService,
    private rubriqueService : RubriqueService,
    private candidatService : CandidatService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,


  ) {

    this.getNote();
    this.getRubrique();
    this.getCand();

  }

  getNote(): void{
    this.notesService.getAllNotes().toPromise().then((data) => {
      this.noteList =data;
      console.log(data);
      
    })
  }

  
  getRubrique(): void{
    this.rubriqueService.getAllRubrique().toPromise().then((data) => {
      this.rubriqueList =data;
      console.log(data);
      
    })
  }

  
  getCand(): void{
    this.candidatService.getAllCandidat().toPromise().then((data)=> {
      this.candidatList = data;
      console.log(data);
      this.isGettingAll = false
      
    });
  }


  
  createNote(): void{
    this.noteDialog = true;
    this.isUpdating = false;
    this.Note = {
      code: '',
      candidat_id : '',
      rubrique_id: '',
      valeur: '',
    
    }

  }


  
noteForm = this.formBuilder.group({
  nom: new FormControl('', [Validators.required]),
  candidat: new FormControl('', [Validators.required]),
  rubrique: new FormControl('', [Validators.required]),
  valeur: new FormControl('', [Validators.required]),
})





resetRequestVariable(message: string): void{
  this.senddingRequest = false;
  this.noteDialog = false;
  this.messageService.add({
    severity: 'success',
    summary: 'Confirmer',
    detail: message,
    life: 5000
  });
  this.Note = {
    code: '',
    candidat_id : '',
    rubrique_id: '',
    valeur: '',
  
  }
}


    
saveNote(e: Event): void {
  e.preventDefault();

  // return;


  // const session = this.noteList.filter((it) => {
  //   return +it.id == +this.Note.session_id
  // })

  const note = {
    candidat_id: this.Note.candidat_id,
    rubrique_id: this.Note.rubrique_id,
    valeur: this.Note.valeur,
    



  };

  console.log(this.Note);
  
  // initiate the request
  this.senddingRequest = true;

  if (this.isUpdating){
    this.notesService.update({
      code: this.Note.code,
      ...note
    }).toPromise().then((data) => {
      this.getNote()

      // console.log(this.getCand());
      
      if(data != null){
        this.resetRequestVariable("Cette note a été modifiée avec succès");
      }else{
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: "une erreur est survenue lors de la modification", life: 5000 });
      }
    },
    (res) => {
      this.senddingRequest = false;
      this.noteDialog = false;
      // tslint:disable-next-line:max-line-length
      this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la modification', life: 5000 });
    });
  }else{
    this.notesService.create(note).toPromise().then((data) => {

      console.log(data);

      console.log(note);
      
      
      if(data != null){
         this.noteList.push(data);
        this.resetRequestVariable("Note créée  avec succès");
        // this.getAllYears()
      }else{
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: "une erreur est survenue lors de la creation surement un problème de date", life: 5000 });
      }
    },
    (res) => {
      this.senddingRequest = false;
      this.noteDialog=false;
  this.noteDialog = false;
      // tslint:disable-next-line:max-line-length
      this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la creation', life: 5000 });
    });
  }

}

dropNote(id: string, 	valeur:string): void{
  this.confirmationService.confirm({
    message: 'Etes vous sur de vouloir supprimer  ' + 	valeur + '? noter que ça suppression inplique la suppression de tout les données qui lui sont liées',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.isGettingAll = true;
      this.notesService.delete(id).toPromise().then((data) => {
        this.isGettingAll = false;
        console.log(data);
        if(data != null){
          this.messageService.add({ severity: 'error', summary: 'erreur', detail: data, life: 5000 });
        }else{
          // tslint:disable-next-line:max-line-length
          this.messageService.add({ severity: 'success', summary: 'success', detail: `note N° ${id} supprimer avec succès`, life: 5000 });
          // tslint:disable-next-line:triple-equals
          this.noteList = this.noteList.filter( it  => it.code != id );
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


editNote(note: any, e: Event): void{
  e.stopPropagation();

  // this.AcademicYear = academicYear;
  this.Note.code = note.code;
  this.Note.valeur = note.valeur;
 
  this.isUpdating = true;
  this.noteDialog = true;
  // console.log(this.AcademicYear);
}





}


