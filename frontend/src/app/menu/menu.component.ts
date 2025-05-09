import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {}

  changePage(event: any){
    event.preventDefault();
    if(event.target.name === "start"){
      this.router.navigate(['/player-name']);
    }
    else if(event.target.name === "rules"){
      this.router.navigate(['/game-rules']);
    }
    else if(event.target.name === "ranking"){
      this.router.navigate(['/ranking']);
    }
  }

}
