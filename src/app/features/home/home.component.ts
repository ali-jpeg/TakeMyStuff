import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { MMapComponent } from '../../m-framework/m-map/m-map.component';
import { FirebaseService } from '../../services/firebase.service';
import { MMainMenuComponent } from "../../m-framework/m-main-menu/m-main-menu.component";
//@ts-ignore
 
@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [MContainerComponent, CommonModule, FormsModule, MMapComponent, MMainMenuComponent]
})
export class HomeComponent {

    
 
  
}
 