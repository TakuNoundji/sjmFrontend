import { Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { DeconnexionComponent } from './deconnexion/deconnexion.component';
import { ActivityComponent } from './activity/activity.component';
import { CandidatComponent } from './candidat/candidat.component';
import { SessionComponent } from './session/session.component';
import { RubriqueComponent } from './rubrique/rubrique.component';
import { SeanceComponent } from './seance/seance.component';

export const routes: Routes = [
    {path: 'connexion', component : ConnexionComponent},
    {path: 'inscription', component : InscriptionComponent},
    {path: 'dashboard',loadChildren: () => import ('./admin/admin.module').then(m =>m.AdminModule)},
    




];
