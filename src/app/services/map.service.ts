import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MapService {
  private baseUrl: string  = environment.base_url;
  constructor(private http: HttpClient) { }
  get headers(){
    return {
      headers : {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
        // 'Access-Control-Allow-Origin': "*"
    }
    };
  }
  geoLocation(address: string){
    return this.http.get(`${ this.baseUrl }/v2/country,city?apiKey=${environment.API_KEY}&apiAddress=${address}`, this.headers ); 
  }

}
