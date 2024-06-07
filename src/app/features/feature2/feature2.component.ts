import { Component } from '@angular/core';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { MMainMenuComponent } from '../../m-framework/m-main-menu/m-main-menu.component';

@Component({
  selector: 'app-feature2',
  standalone: true,
  imports: [MContainerComponent, MMainMenuComponent],
  templateUrl: './feature2.component.html',
  styleUrl: './feature2.component.css'
})
export class Feature2Component {

}
