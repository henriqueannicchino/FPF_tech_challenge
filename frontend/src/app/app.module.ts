import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { PlayerNameComponent } from './player-name/player-name.component';
import { RankingComponent } from './ranking/ranking.component';
import { GameRulesComponent } from './game-rules/game-rules.component';
import { HeroComponent } from './hero/hero.component';
import { EnemyComponent } from './enemy/enemy.component';
import { GameScreenComponent } from './game-screen/game-screen.component';
import { LogComponent } from './log/log.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PlayerNameComponent,
    RankingComponent,
    GameRulesComponent,
    HeroComponent,
    EnemyComponent,
    GameScreenComponent,
    LogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [
    HeroComponent,
    EnemyComponent,
    LogComponent,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
