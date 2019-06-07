import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map'
import { map } from "rxjs/operators";
import 'rxjs/Rx';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: Http) { }

}
