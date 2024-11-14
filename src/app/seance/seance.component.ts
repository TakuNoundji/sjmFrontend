import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ActivityComponent } from '../activity/activity.component';
import { HeaderActivityComponent } from '../header-activity/header-activity.component';
import { FooterActivityComponent } from '../footer-activity/footer-activity.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SeanceService } from '../services/seance.service';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RubriqueService } from '../services/rubrique.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-seance',
  standalone: true,
  imports: [TableModule,ConfirmDialogModule, ActivityComponent,ToastModule, CommonModule,   ReactiveFormsModule, HeaderActivityComponent,NgIf, FooterActivityComponent, SidebarComponent, TableModule, DialogModule, FormsModule],
  templateUrl: './seance.component.html',
  styleUrl: './seance.component.css',
  providers: [SeanceService,MessageService, ConfirmationService, RubriqueService]
})
export class SeanceComponent {


  Seance = {
    code: '',
    hdebut : '',
    hfin: '',
    jury: '',
    nbrseance: '',
    rubrique_id : ''

  
  }



  annuler(): void{
    if (this.isUpdating === false) {
      this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'operation annuler', life: 3000 });
    }
    this.seanceDialog = false;
  }

  editSeance(seance: any, e: Event): void{
    e.stopPropagation();
  
    // this.AcademicYear = academicYear;
    this.Seance.code = seance.code;
    this.Seance.hdebut = seance.hdebut;
    this.Seance.hfin = seance.hfin;
    this.Seance.jury = seance.jury;
    this.Seance.nbrseance = seance.nbrseance;
    this.isUpdating = true;
    this.seanceDialog = true;
    // console.log(this.AcademicYear);
  }

  createSean(): void{
    this.seanceDialog = true;
    this.isUpdating = false;
    this.Seance = {
      code: '',
      hdebut : '',
      hfin: '',
      jury: '',
      nbrseance: '',
      rubrique_id : ''

    
    }

  }
  seanceForm = this.formBuilder.group({
    hdebut: new FormControl('', [Validators.required]),
    hfin: new FormControl('', [Validators.required]),
    jury: new FormControl('', [Validators.required]),
    nbrseance: new FormControl('', [Validators.required]),
    rubrique: new FormControl('', [Validators.required]),


  
  
  })
  

  
  fileDialog = false;
  search="";
  loading=false;
  seanceDialog=false;
  isGettingAll = true;
  senddingRequest = false;
  isUpdating = false;


  seanceList = Array();

  rubriqueList = Array();

  customers : any ;
  constructor(private seanceService : SeanceService,
    private messageService : MessageService,
    private formBuilder : FormBuilder,
    private rubriqueService : RubriqueService,
    private  confirmationService : ConfirmationService
  ){

    this.getSea();
    this.getRubrique();

  }


  
  getSea(): void{
    this.seanceService.getAlSeance().toPromise().then((data) => {
      this.seanceList = data;
      console.log(data);
      

    })
  }

  resetRequestVariable(message: string): void{
    this.senddingRequest = false;
    this.seanceDialog = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Confirmer',
      detail: message,
      life: 3000
    });
    this.Seance = {
      code: '',
      hdebut : '',
      hfin: '',
      jury: '',
      nbrseance: '',
      rubrique_id : ''

    
    }
  }

  saveSean(e: Event): void {
    e.preventDefault();
  
    // return;
  
  
    
  
    const sea = {
      hdebut: this.Seance.hdebut,
      hfin: this.Seance.hfin,
      jury: this.Seance.jury,
      nbrseance: this.Seance.nbrseance,
      rubrique_id: this.Seance.rubrique_id

  
  
  
    };
  
    console.log(this.Seance);
    
    // initiate the request
    this.senddingRequest = true;
  
    if (this.isUpdating){
      this.seanceService.update({
        code: this.Seance.code,
        ...sea
      }).toPromise().then((data) => {
        this.getSea()
  
        // console.log(this.getCand());
        
        if(data != null){
          this.resetRequestVariable("Cette séance a été modifiée avec succès");
        }else{
          this.messageService.add({ severity: 'error', summary: 'erreur', detail: "une erreur est survenue lors de la modification", life: 3000 });
        }
      },
      (res) => {
        this.senddingRequest = false;
        this.seanceDialog = false;
        // tslint:disable-next-line:max-line-length
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la modification', life: 3000 });
      });
    }else{
      this.seanceService.create(sea).toPromise().then((data) => {
  
        console.log(data);
  
        console.log(sea);
        
        
        if(data != null){
           this.seanceList.push(data);
          this.resetRequestVariable("Séance créée  avec succès");
          // this.getAllYears()
        }else{
          this.messageService.add({ severity: 'error', summary: 'erreur', detail: "une erreur est survenue lors de la creation surement une probleme de date", life: 3000 });
        }
      },
      (res) => {
        this.senddingRequest = false;
        this.seanceDialog=false;
    this.seanceDialog = false;
        // tslint:disable-next-line:max-line-length
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'erreur lors de la creation', life: 3000 });
      });
    }
  
  }

  getRubrique(): void{
    this.rubriqueService.getAllRubrique().toPromise().then((data) => {
      this.rubriqueList =data;
      console.log(data);
      
    })
  }

  
  dropSeance(id: string, 	hdebut:string): void{
  this.confirmationService.confirm({
    message: 'Etes vous sur de vouloir supprimer  ' + 	hdebut + '? noter que ça suppression inplique la suppression de tout les données qui lui sont liées',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.isGettingAll = true;
      this.seanceService.delete(id).toPromise().then((data) => {
        this.isGettingAll = false;
        console.log(data);
        if(data != null){
          this.messageService.add({ severity: 'error', summary: 'erreur', detail: data, life: 3000 });
        }else{
          // tslint:disable-next-line:max-line-length
          this.messageService.add({ severity: 'success', summary: 'success', detail: `Séance N° ${id} supprimée avec succès`, life: 3000 });
          // tslint:disable-next-line:triple-equals
          this.seanceList = this.seanceList.filter( it  => it.code != id );
        }
      }, (res)=>{
        this.isGettingAll = false
        console.log(res);
        this.messageService.add({ severity: 'error', summary: 'erreur', detail: res.error.error, life: 3000 });
      });
    },
    reject: () => {
      this.messageService.add({ severity: 'error', summary: 'erreur', detail: 'operation annulée', life: 3000 });
    }
  });
}
  

}
