import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { SharedService } from '../service/shared.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  @Output() logEvent = new EventEmitter(true);
  dataEventSubscription:Subscription;

  turn:number = 1;
  endOfGame: boolean = false;

  public logs = [
    {type: "logItemTurn", msg: `Turno: ${this.turn}`},
  ];

  constructor(private sharedService:SharedService) { 
    this.dataEventSubscription= this.sharedService.getData().subscribe((data)=>{
      this.registerLog(data);
    })
  }

  ngOnInit(): void {
  }

  @Input()
  set setEndOfGame(endOfGame: boolean){
    this.endOfGame = endOfGame;
  }

  public registerLog(dataLog:any){
    this.logs.push({type: dataLog.type, msg: dataLog.msg});
    if((dataLog.type === "logItemEnemyAttack" || dataLog.type === "logItemEnemyStunned") && !this.endOfGame){
      this.turn++;
      this.logs.push({type: "logItemTurn", msg: `Turno: ${this.turn}`},);
    }
    this.logEvent.emit({turnNumeber: this.turn});
    return this.logs;
  }
}
