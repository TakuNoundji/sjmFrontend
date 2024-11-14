import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeconnexionComponent } from '../deconnexion/deconnexion.component';
import { SessionComponent } from '../session/session.component';
import { SeanceComponent } from '../seance/seance.component';
import { RubriqueComponent } from '../rubrique/rubrique.component';
import { CandidatComponent } from '../candidat/candidat.component';
import { AdminComponent } from './admin.component';
import { OptimisationComponent } from '../optimisation/optimisation.component';
import { CandidatsElligiblesOraleComponent } from '../candidats-elligibles-orale/candidats-elligibles-orale.component';
import { NotesComponent } from '../notes/notes.component';
import { CandidatsEliminesComponent } from '../candidats-elimines/candidats-elimines.component';
import { OrdonnancementComponent } from '../ordonnancement/ordonnancement.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    pathMatch: 'full',

  },
  {path: 'deconnexion', component : DeconnexionComponent},
  {path: 'candidat', component : CandidatComponent},
  {path: 'session', component : SessionComponent},
  {path: 'rubrique', component : RubriqueComponent},
  {path: 'seance', component : SeanceComponent},
  {path: 'optimisation', component : OptimisationComponent},
  {path: 'EOraux', component : CandidatsElligiblesOraleComponent},
  {path: 'notes', component : NotesComponent},
  {path: 'candidatsElimines', component : CandidatsEliminesComponent},
  {path: 'ordonnancement', component : OrdonnancementComponent},







];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
