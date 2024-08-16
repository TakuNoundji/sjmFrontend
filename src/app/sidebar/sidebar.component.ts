import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SeanceComponent } from '../seance/seance.component';
import { SessionComponent } from '../session/session.component';
import { CandidatComponent } from '../candidat/candidat.component';
import { RubriqueComponent } from '../rubrique/rubrique.component';
import { AdminComponent } from '../admin/admin.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLinkActive,
    RouterLink,
    
    
    
    
    
    
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
