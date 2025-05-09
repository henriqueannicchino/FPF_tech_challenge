import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {first} from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-name',
  templateUrl: './player-name.component.html',
  styleUrls: ['./player-name.component.scss']
})
export class PlayerNameComponent implements OnInit {

  playerName = '';
  private readonly host = environment.host;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  savePlayerName(){
    this.http.post(`${ this.host }player`, {"name": this.playerName}, {observe: 'response'})
    .pipe(first())
      .subscribe((res:any) => {
          if(res.status === 201){
            localStorage.setItem('playerId', res.body.createdPlayer._id);
            localStorage.setItem('playerName', this.playerName);
            this.router.navigate(['/game-screen'], {state: {playerName: this.playerName}});
          }

      }, (err: HttpErrorResponse) => {
          console.log(err);
      });    
  }

}
