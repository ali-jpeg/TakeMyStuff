import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
 
//@ts-ignore
declare var google; // Forward Declaration
 
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MContainerComponent,CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  lat: number;
  lng: number;
 
  map: any;
  marker: any;
  circle: any;
 
  fences: any[];
 
  constructor(){
    this.lat = 0;
    this.lng = 0;
    this.fences = [];
  }
  
  ngOnInit(){
    this.getLocation();
  }
 
  async initMap(){  
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
 
    this.map = new Map(document.getElementById("map"),
      {
        zoom:16,
        center: {lat: this.lat, lng: this.lng},
        disableDoubleClickZoom: true,
        mapId: "Demo Map"
      }
    );
    
    google.maps.event.addListener(this.map, 'dblclick',(event:any)=>{
      console.log("You pressed on "+event.latLng.lat()+ " "+ event.latLng.lng());
      const circle = new google.maps.Circle(
        {
          map: this.map,
          radius: 100,
          center: event.latLng,
          editable: true
        }
      );
      this.fences.push(circle);
    });
 
 
  }
  getLocation(){
    navigator.geolocation.getCurrentPosition((data)=>{
      this.lat = data.coords.latitude;
      this.lng = data.coords.longitude;
      this.initMap();
    });
  }
 
  upload2Firebase(){
    //TODO: take fences and push to firebase using firebase service
  }
 
}
 