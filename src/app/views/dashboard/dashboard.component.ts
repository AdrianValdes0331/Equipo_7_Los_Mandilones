import * as _ from 'lodash';
import { Image } from 'src/app/models/image.model';
import * as moment from 'moment';

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FavoriteService } from "src/app/services/favorite.service"
import { toInteger } from 'lodash';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent{
  filteredApps = 'All';
  icono: string;
  state: number;
  nstate: number;
  categor: string;
  constructor(
    private favoriteService: FavoriteService,
    private router: Router
  ) { 
    this.icono = 'favorite_border';
    this.state = 1;
    this.nstate = 1;
  }

  favorited = this.favoriteService.getFavorites();
  fKeys = Object.keys(this.favorited);
  fVals = Object.values(this.favorited);

  ngOnInit(): void {
  }

  fakeArray(num){
    return new Array(num);
  }

  CheckState(nState){
    this.nstate = nState;
    return this.nstate;
  }

  onClick(b: boolean, i: string){
    console.log('click');
    var j = parseInt(i);
    if(b && this.favoriteService.favorites[j]==undefined){
      this.favoriteService.addToFavorites(j, "https://angular.io/tutorial");
    }
    else if(!b && this.favoriteService.favorites[j]!=undefined){
      this.favoriteService.removeFromFavorites(j);
    }
    //We found the Way
    this.fKeys = Object.keys(this.favorited);
    this.fVals = Object.values(this.favorited);
  }

  onErase(b: boolean, i: string){
    var j = parseInt(i);
    if(!b && this.favoriteService.favorites[j]!=undefined){
      this.favoriteService.removeFromFavorites(j);
    }
  }

}

