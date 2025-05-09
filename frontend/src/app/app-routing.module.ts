import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { PlayerNameComponent } from './player-name/player-name.component';
import { GameRulesComponent } from './game-rules/game-rules.component';
import { RankingComponent } from './ranking/ranking.component';
import { GameScreenComponent } from './game-screen/game-screen.component';

const routes: Routes = [
  {path: '', component: MenuComponent},
  {path: 'player-name', component: PlayerNameComponent},
  {path: 'game-rules', component: GameRulesComponent},
  {path: 'ranking', component: RankingComponent},
  {path: 'game-screen', component: GameScreenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
