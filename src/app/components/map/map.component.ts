import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Map, marker, tileLayer, icon } from 'leaflet';
import { GeoLocate } from 'src/app/models/geoLocate.model';
import { MapService } from 'src/app/services/map.service';
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
    
      var greenIcon = icon({
        iconUrl: '../../assets/images/icon-location.svg',
        iconSize:     [45, 60], 
        iconAnchor:   [22, 94], 
    });
      const markerItem = marker([this.geoLocate.location.lat, this.geoLocate.location.lng], {icon: greenIcon}).addTo(this.map);
      this.map.fitBounds([
        [markerItem.getLatLng().lat, markerItem.getLatLng().lng]
      ]);

    }, (err: Error) => {
      console.log(err)
    });
  }

}
