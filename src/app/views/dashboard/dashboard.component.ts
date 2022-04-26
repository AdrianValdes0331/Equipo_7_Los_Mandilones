import * as _ from 'lodash';
import { Image } from 'src/app/models/image.model';
import * as moment from 'moment';

import { Component } from '@angular/core';
import { FavoriteService } from "src/app/services/favorite.service"

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent{
  icono: string;
  state: number;
  constructor(
    private favoriteService: FavoriteService
  ) { 
    this.icono = 'favorite_border';
    this.state = 1;
  }

  favorited = this.favoriteService.getFavorites();

  ngOnInit(): void {
  }

  fakeArray(num){
    return new Array(num);
  }

  onClick(b: boolean, i: number){
    console.log('click');
    if(b && this.favoriteService.favorites[i]==undefined){
      this.favoriteService.addToFavorites(i, "https://angular.io/tutorial");
    }
    else if(!b && this.favoriteService.favorites[i]!=undefined){
      this.favoriteService.removeFromFavorites(i);
    }
  }
}

