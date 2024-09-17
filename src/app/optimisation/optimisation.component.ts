import { Component, OnInit } from '@angular/core';
import { HeaderActivityComponent } from '../header-activity/header-activity.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ConfirmationService, Footer, MessageService } from 'primeng/api';
import { FooterActivityComponent } from '../footer-activity/footer-activity.component';
import { ToastModule } from 'primeng/toast';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CommonModule, NgIf, SlicePipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { RubriqueService } from '../services/rubrique.service';

@Component({
  selector: 'app-optimisation',
  standalone: true,
  imports: [HeaderActivityComponent, SidebarComponent, FooterActivityComponent, ToastModule, FormsModule, TableModule, SlicePipe,NgIf,DialogModule, CommonModule,   ReactiveFormsModule,],
  templateUrl: './optimisation.component.html',
  styleUrl: './optimisation.component.css',
  providers: [RubriqueService, MessageService, ConfirmationService,]

})
export class OptimisationComponent implements OnInit{

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
  


  rubriqueList = Array();
  optimisationList = Array();


  constructor(private rubriqueService : RubriqueService,
    private messageService : MessageService,
    private confirmationService : ConfirmationService,
    private formBuilder : FormBuilder

  ){

    this.getRubrique();

  }

  

  

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

  listSeance: any=[];


  ngOnInit(): void {
    

    console.log("bonjour");
 
 console.log('iciiiiiiiiiiiiiii');
 console.log(this.addtime('8h45',20));
 console.log(this.simulationPlan(this.rubrique));
 this.listSeance=this.simulationPlan(this.rubrique);
 // console.log(this.listWaza);
 
 console.log("le nombre de jury pour cette rubrique est ", Math.max(...this.simulationPlan(this.rubrique).map(x => x.jury)));
 console.log("le nombre de séance pour cette rubrique est ", Math.max(...this.simulationPlan(this.rubrique).map(x => x.nbrseance)));
 console.log("le nombre  jurys individuels est ", Math.max(...this.simulationPlan(this.rubrique).map(x => x.jury))*3);


}

nbcandidat=103;

rubrique =  {
 nombreDeCandidatsParPassage: 6,
 dureeDePassage: 15,
 pause: 5,
 heureDeDebut: "08h50",
 heureDeFin: "16h00",
 nomDeLaRubrique: "Anglais",
}


listRubrique=[

{
  nombreDeCandidatsParPassage: 1,
  dureeDePassage: 15,
  pause: 5,
  heureDeDebut: "08h50",
  heureDeFin: "16h00",
  nomDeLaRubrique: "Anglais",
},
{
  nombreDeCandidatsParPassage: 1,
  dureeDePassage: 15,
  pause: 5,
  heureDeDebut: "08h50",
  heureDeFin: "16h00",
  nomDeLaRubrique: "Allemand",
},
{
  nombreDeCandidatsParPassage: 1,
  dureeDePassage: 15,
  pause: 5,
  heureDeDebut: "08h50",
  heureDeFin: "16h00",
  nomDeLaRubrique: "Français",
},
{
  nombreDeCandidatsParPassage: 6,
  dureeDePassage: 15,
  pause: 5,
  heureDeDebut: "08h50",
  heureDeFin: "16h00",
  nomDeLaRubrique: "Collectif",
}



];


  //on genere les séances
  simulationPlan(rubrique:any){

    let numJury=1;
    let debut="";
    let numseance=1;
    let nombreSeance = 0;
    let fin="";
    let newjury=true;
    let list_seance=[];
  
    for(let i=this.nbcandidat;i>0;i=i-rubrique?.nombreDeCandidatsParPassage){
      

      if(list_seance.length>0){
        if(this.compareDate(this.addtime(this.addtime(list_seance[list_seance.length-1].hfin,rubrique.pause),rubrique.dureeDePassage) ,rubrique.heureDeFin)){
          newjury=true;
          numJury++;
          numseance=0;
        }
        numseance ++;
        nombreSeance = numseance / numJury 


      }

      if (rubrique?.nombreDeCandidatsParPassage==1) {
        

        
      }

      if(newjury){
        debut=rubrique.heureDeDebut;
        newjury=false;
      }else{
        debut = this.addtime(list_seance[list_seance.length-1].hfin,rubrique.pause);
      }

      fin=this.addtime(debut,rubrique.dureeDePassage);
      list_seance.push({
        hdebut:debut,
        hfin:fin,
        jury:numJury,
        nbrseance: numseance,
        codeRubrique : rubrique.code
      });
      
    
    }
    return list_seance;

  }

  addtime(datestring:string,time:number){
    let mydate=new Date();

    mydate.setHours(parseInt(datestring.split('h')[0]));
    mydate.setMinutes(parseInt(datestring.split('h')[1]));
    mydate.setSeconds(0);
    
    mydate.setMinutes(mydate.getMinutes()+time);

    return this.formatNumer(mydate.getHours().toString())+'h'+this.formatNumer(mydate.getMinutes().toString());

  }

  formatNumer(num:string){
    if(String(num).length==1){
      return "0"+num;
    }
    return num;

  }

  compareDate(datestring1:string,datestring2:string){
    let mydate1=new Date();
    let mydate2=new Date();
    mydate1.setHours(parseInt(datestring1.split('h')[0]));
    mydate1.setMinutes(parseInt(datestring1.split('h')[1]));
    mydate1.setSeconds(0);

    mydate2.setHours(parseInt(datestring2.split('h')[0]));
    mydate2.setMinutes(parseInt(datestring2.split('h')[1]));
    mydate2.setSeconds(0);

    return mydate1>=mydate2;
  }




  


}
