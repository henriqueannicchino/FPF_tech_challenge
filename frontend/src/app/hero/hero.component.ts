import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { SharedService } from '../service/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  private imageNum: number = 0;
  protected heroImage: string = `../../assets/images/hero/idle/heroIdle${this.imageNum}.png`;
  private action: number = 0;
  private heroName: string = 'Warrior';
  private heroLife: number = 100;
  
  @Output() heroEvent = new EventEmitter();
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
      this.changeLife(damage.heroDamaged);
    })
   }

  ngOnInit(): void {
    this.getImage();
  }

  @Input()
  set setPlayerName(heroName:string){
    this.heroName = heroName;
  }

  public getHerolife(){
    return this.heroLife;
  }

  getImage() {
    let imageChanger =  setInterval(() => {
      if (this.imageNum+1 > 9) {
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
        this.heroImage = `../../assets/images/hero/idle/heroIdle${this.imageNum}.png`;
      }
      else if(this.action===1 || this.action===2){
        this.heroImage = `../../assets/images/hero/attack/heroAttack${this.imageNum}.png`;
      }
      else if(this.action===3){
        this.heroImage = `../../assets/images/hero/hurt/heroHurt${this.imageNum}.png`;
      }
      else if(this.action===4){
        this.heroImage = `../../assets/images/hero/dying/heroDying${this.imageNum}.png`;
      }
    }, 100);
  }

  changeLife(damage:number){
    if(typeof(damage) === 'number'){
      if(damage!==0){
        if(this.heroLife - damage > 0){
          this.heroLife -= damage;
        }
        else{
          this.heroLife = 0
        }
        this.imageNum=0;
        this.action= this.heroLife > 0 ? 3 : 4;
      }
    }
  }

  randomNumber(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  basicAttack(){
    const damage = this.randomNumber(5,10);
    this.sharedService.emitdata({type:"logItemAttack", msg:`${this.heroName} atacou o Dark Wraith (-${damage})`});
    this.sharedService.emitDamage({enemyDamaged: damage});
    this.imageNum=0;
    this.action = 1;
    setTimeout(() => {
      this.heroEvent.emit({playerTurn: false, enemyDamaged: damage});
    }, 1500);
  }

  especialAttack(){
    const damage = this.randomNumber(10,20);
    const enemyStunned = this.randomNumber(0,1);
    this.sharedService.emitdata({type:"logItemEspecialAttack", msg:`${this.heroName} usou o golpe especial (-${damage})`});
    this.sharedService.emitDamage({enemyDamaged: damage});
    this.imageNum=0;
    this.action = 2;
    setTimeout(()=>{ 
      if(enemyStunned===0){
        this.heroEvent.emit({playerTurn: false, enemyDamaged: damage, heroUsedEspecial: true});
      }
      else{
        this.sharedService.emitdata({type:"logItemEnemyStunned", msg: 'Inimigo atordoado'});
        this.heroEvent.emit({playerTurn: true, enemyDamaged: damage, enemyStunned: true, heroUsedEspecial: true});
      }
    }, 1500);
  }

  cure(){
    const cure = this.randomNumber(5,15);
    this.sharedService.emitdata({type:"logItemCure", msg:`${this.heroName} usou a cura (+${cure})`});
    this.heroEvent.emit({playerTurn: false, heroCure: cure});
  }

}
