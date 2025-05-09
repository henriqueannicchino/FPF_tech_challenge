import { Component, OnInit } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { EnemyComponent } from '../enemy/enemy.component';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss']
})
export class GameScreenComponent implements OnInit {

  private readonly host = environment.host;

  protected playerName: string = '';
  protected heroLife: number = 10;
  protected enemyLife: number = 10;
  protected playerTurn: boolean = true;
  protected victory: boolean = false;
  protected defeated: boolean = false;
  protected especialCount: number = 0;
  protected enemyStunned: boolean = false;
  protected turnNumber: number = 1;
  protected endOfGame: boolean = false;
  protected score: number = 0;
  protected quitCardOpen: boolean = false;

  constructor(
    protected hero: HeroComponent,
    private enemy: EnemyComponent,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.playerName = history.state.playerName !== undefined 
      ? history.state.playerName 
      : localStorage.getItem("playerName")!==null
        ? localStorage.getItem("playerName")
        : "Warrior";
    this.heroLife = this.hero.getHerolife();
    this.enemyLife = this.enemy.getEnemylife();
  }

  updateTurn(data:any){
    this.turnNumber = data.turnNumeber;
  }

  receiveData(data:any){
    //switch between player and enemy turn
    if(data.playerTurn !== undefined)
      this.changePlayerTurn(data.playerTurn);
    
    //check if player used especial
    if(data.heroUsedEspecial !== undefined){
      this.especialCount = 4;
    }

    if(data.enemyStunned !== undefined){
      this.enemyStunned = true;
    }

    //check if enemy suffered demage
    if(data.enemyDamaged !== undefined)
      this.changeEnemyLife(data.enemyDamaged);
    else if(data.heroDamaged !== undefined) //check if player suffered demage
      this.changeHeroLife(data.heroDamaged);
    else if(data.heroCure !== undefined){ //check if player used cure
      this.cureHero(data.heroCure);
    }
  }

  changePlayerTurn(playerTurn: boolean){
    this.playerTurn = playerTurn;
    if(this.especialCount>0)
      this.especialCount--;
    if(this.enemyStunned===true && this.playerTurn===false){
      this.enemyStunned = false;
    }
  }

  changeEnemyLife(value: number){
    if(this.enemyLife - value > 0) {
      this.enemyLife -= value;
    }
    else{
      this.enemyLife = 0;
      this.victory = true;
      this.endOfGame = true;
      this.savePontuation();
    }
  }

  changeHeroLife(value: number){
    if(this.heroLife - value > 0) {
      this.heroLife -= value;
    }
    else{
      this.heroLife = 0;
      this.defeated = true;
      this.endOfGame = true;
      this.savePontuation();
    }
  }

  cureHero(value: number){
    if(this.heroLife + value < 100){
      this.heroLife += value;
    }
    else {
      this.heroLife = 100;
    }
  }

  savePontuation(){
    this.score = Math.round( ((this.heroLife * 1000) / this.turnNumber) * 100) / 100;
    const playerId = localStorage.getItem("playerId");
    const dataToUpdate = [{ "propName": "score", "value": `${this.score}` }];

    this.http.patch(`${ this.host }player/${playerId}`, dataToUpdate, {observe: 'response'})
      .subscribe((res:any) => {
          if(res.status === 200){
            alert("Pontuação Salva com Sucesso!");
          }
      }, (err: HttpErrorResponse) => {
          console.log(err);
      });
  }

  openQuitCard(){
    this.quitCardOpen = true;
  }

  closeQuitCard(){
    this.quitCardOpen = false;
  }

  changePage(event: any) {
    event.preventDefault();
    if(event.target.name === "quit"){
      this.router.navigate(['/']);
    }
    else if(event.target.name === "ranking"){
      this.router.navigate(['/ranking']);
    }
  }
}
