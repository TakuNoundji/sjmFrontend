import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeconnexionComponent } from '../deconnexion/deconnexion.component';
import { SessionComponent } from '../session/session.component';
import { SeanceComponent } from '../seance/seance.component';
import { RubriqueComponent } from '../rubrique/rubrique.component';
import { CandidatComponent } from '../candidat/candidat.component';
import { AdminComponent } from './admin.component';

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

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
