import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../environments/environment';
const API_KEY = 'at_W2E2WnkyuEyKxqpWMVXVQ8QDF75im';
@Injectable({
  providedIn: 'root'
})
export class MapService {
  private baseUrl: string  = environment.base_url;
  constructor(private http: HttpClient) { }
  get headers(){
    return {
      headers : {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    }
    };
  }
  geoLocation(address: string){
    return this.http.get(`${ this.baseUrl }/v2/country,city?apiKey=${API_KEY}&apiAddress=${address}`, this.headers
  ); 
  }

}
