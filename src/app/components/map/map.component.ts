import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Map, marker, tileLayer } from 'leaflet';
import { GeoLocate } from 'src/app/models/geoLocate.model';
import { MapService } from 'src/app/services/map.service';
// import { environment } from '../environments/environment';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  infoTitle = ['IP ADDRESS', 'LOCATION', 'TIMEZONE', 'ISP']
  geoLocate = new GeoLocate();
  map:any;
  constructor(public mapService: MapService) { }
  ngOnInit(): void {
    this.map = new Map('map').setView([51.505, -0.09], 4);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(this.map);
  }
  ngAfterViewInit(): void {


  }

  searchAddress(address: string) {
    if (!address) {
      return ;
    }
    this.mapService.geoLocation(address).subscribe((res: any) => {
      this.geoLocate = res;
      this.map.setView([this.geoLocate.location.lat, this.geoLocate.location.lng], 13);
    
      const markerItem = marker([this.geoLocate.location.lat, this.geoLocate.location.lng]).addTo(this.map);
      this.map.fitBounds([
        [markerItem.getLatLng().lat, markerItem.getLatLng().lng]
      ]);

    }, (err: Error) => {
      console.log(err)
    });
  }

}
