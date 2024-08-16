import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DeconnexionComponent } from '../deconnexion/deconnexion.component';
import { HeaderActivityComponent } from '../header-activity/header-activity.component';
import { FooterActivityComponent } from '../footer-activity/footer-activity.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ActivityComponent } from '../activity/activity.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
