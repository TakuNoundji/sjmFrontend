import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-deconnexion',
  standalone: true,
  imports: [NgFor,
    NgIf,
  RouterLink],  templateUrl: './deconnexion.component.html',
  styleUrl: './deconnexion.component.css'
})
export class DeconnexionComponent {

}
