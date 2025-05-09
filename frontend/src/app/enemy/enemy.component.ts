import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { SharedService } from '../service/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-enemy',
  templateUrl: './enemy.component.html',
  styleUrls: ['./enemy.component.scss']
})
export class EnemyComponent implements OnInit {

  private imageNum: number = 0;
  protected enemyImage: string = `../../assets/images/enemy/idle/enemyIdle${this.imageNum}.png`;
  private action: number = 0;
  private enemyLife: number = 100;
  private turnCount: number = 0; 

  @Output() enemyEvent = new EventEmitter(true);
  playerTurn: boolean = true;

  dataEventSubscription:Subscription;

  /*
    action description
    0 - idle
    1 - basic attack
    2 - especial attack
    3 - hurt
    4 - dying
  */

  constructor( private sharedService:SharedService ) {
    this.dataEventSubscription= this.sharedService.getData().subscribe((damage)=>{
      this.changeLife(damage.enemyDamaged);
    })
  }

  ngOnInit(): void {
    this.getImage();
  }

  public getEnemylife(){
    return this.enemyLife;
  }

  @Input()
  set setPlayerTurn(playerTurn: boolean){
    this.playerTurn = playerTurn;
    this.attack();
  }

  getImage() {
    let imageChanger = setInterval(() => {
      if ((this.imageNum+1 > 11 && this.action !== 2) || this.imageNum+1 > 17) {
        if(this.action !== 4){
          this.imageNum=0;
          if(this.action!==0)
            this.action = 0;
        }
        else {
          clearInterval(imageChanger);
        }
      }
      else{
        this.imageNum++;
      }

      if(this.action===0){
        this.enemyImage = `../../assets/images/enemy/idle/enemyIdle${this.imageNum}.png`;
      }
      else if(this.action===1){
        this.enemyImage = `../../assets/images/enemy/attack/enemyAttack${this.imageNum}.png`;
      }
      else if(this.action===2){
        this.enemyImage = `../../assets/images/enemy/especial/enemyEspecial${this.imageNum}.png`;
      }
      else if(this.action===3){
        this.enemyImage = `../../assets/images/enemy/hurt/enemyHurt${this.imageNum}.png`;
      }
      else if(this.action===4){
        this.enemyImage = `../../assets/images/enemy/dying/enemyDying${this.imageNum}.png`;
      }
    }, 100);
  }

  changeLife(damage:number){
    if(typeof(damage) === 'number'){
      if(damage!==0){
        if(this.enemyLife - damage > 0){
          this.enemyLife -= damage;
        }
        else{
          this.enemyLife = 0
        }
        this.imageNum=0;
        this.action= this.enemyLife > 0 ? 3 : 4;
        this.turnCount++;
        if(this.turnCount>3){
          this.turnCount=1;
        }
      }
    }
  }

  attack() {
    setTimeout(() => {
      if(this.enemyLife > 0) {
        if(this.turnCount>=3){
          this.especialAttack();
        }
        else{
          this.basicAttack();
        }
      }
    }, 2000);
  }

  randomNumber(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  basicAttack(){
    if(!this.playerTurn){
      let damage = this.randomNumber(6,12);
      this.sharedService.emitdata({type:"logItemEnemyAttack", msg:`Dark Wraith causou dano (-${damage})`});
      this.sharedService.emitDamage({heroDamaged: damage});
      this.enemyEvent.emit({playerTurn: true, heroDamaged: damage});
      this.imageNum=0;
      this.action = 1;
      this.playerTurn = true;
    }
  }

  especialAttack(){
    if(!this.playerTurn){
      let damage = this.randomNumber(8,16);
      this.sharedService.emitdata({type:"logItemEnemyAttack", msg:`Dark Wraith usou o golpe especial (-${damage})`});
      this.sharedService.emitDamage({heroDamaged: damage});
      this.enemyEvent.emit({playerTurn: true, heroDamaged: damage});
      this.imageNum=0;
      this.action = 2;
      this.playerTurn = true;
    }
  }

}
