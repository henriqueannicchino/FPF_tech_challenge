import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private subject = new Subject<any>();

  emitDamage(damage:any){
    this.subject.next(damage);
  }

  emitdata(dataLog:any){
    this.subject.next(dataLog);
  }

  getData():Observable<any>{
    return this.subject.asObservable();
 }
}