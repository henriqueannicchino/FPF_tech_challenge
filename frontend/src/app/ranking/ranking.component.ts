import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Player } from '../model/player';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  private readonly host = environment.host;

  displayedColumns: string[] = [
    'name',
    'date',
    'score',
  ];

  dateTemp: any = new Date();

  playersData: Player[] = [];

  protected tableLoaded:boolean = false;

  
  dataSourceWithPageSize = new MatTableDataSource(this.playersData);

  @ViewChild('paginatorPageSize') paginatorPageSize: MatPaginator;

  pageSizes = [5, 10, 25, 50, 100];

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.retrivePlayerData();
  }

  ngAfterViewInit() {
    this.dataSourceWithPageSize.paginator = this.paginatorPageSize;
  }

  retrivePlayerData(){
    this.http.get(`${ this.host }player-all-gt-zero`, {observe: 'response'})
    .pipe(first())
      .subscribe((res:any) => {
          if(res.status === 200){
            let date;
            res.body.forEach(item => {
              date = new Date(Date.parse(item.updatedAt));
              this.playersData.push({
                  name: item.name,
                  score: item.score,
                  date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
              });
            });

            this.tableLoaded = true;
          }

      }, (err: HttpErrorResponse) => {
          console.log(err);
      });
  }

  goToHome() {
    this.router.navigate(['/']);
  }

}
