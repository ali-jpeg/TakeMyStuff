import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Loader } from '@googlemaps/js-api-loader';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MContainerComponent]
})
export class NavigationComponent implements OnInit {
  private map!: google.maps.Map;
  private directionsService!: google.maps.DirectionsService;
  private directionsRenderer!: google.maps.DirectionsRenderer;

  startLat = '';
  startLng = '';
  endLat = '';
  endLng = '';

  constructor() {}

  ngOnInit(): void {
    const loader = new Loader({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with your actual API key
      version: 'weekly',
      libraries: ['places']
    });

    loader.load().then(() => {
      this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
      });
      this.directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer();
      this.directionsRenderer.setMap(this.map);
    });
  }

  calculateRoute(): void {
    if (this.startLat === '' || this.startLng === '' || this.endLat === '' || this.endLng === '') {
      alert('Please enter all latitude and longitude values');
      return;
    }

    const start = new google.maps.LatLng(parseFloat(this.startLat), parseFloat(this.startLng));
    const end = new google.maps.LatLng(parseFloat(this.endLat), parseFloat(this.endLng));

    this.directionsService.route(
      {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (response, status) => {
        if (status === 'OK') {
          this.directionsRenderer.setDirections(response);
        } else {
          alert('Directions request failed due to ' + status);
        }
      }
    );
  }
}
