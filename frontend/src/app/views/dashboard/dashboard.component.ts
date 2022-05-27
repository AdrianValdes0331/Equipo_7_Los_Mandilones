import * as _ from 'lodash';
import { Image } from 'src/app/models/image.model';
import * as moment from 'moment';

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FavoriteService } from "src/app/services/favorite.service"
import { toInteger } from 'lodash';
import { UserState, UserStore } from 'src/app/states/user.store';
import { User } from "src/app/models/user.model";
import { UserProfile } from 'src/app/models/user-profile.model';
import { UserQuery } from "src/app/queries/user.queries";

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
  favorited: {[key: string]: string}

  constructor(
    private userQuery: UserQuery,
    private favoriteService: FavoriteService,
    private router: Router
  ) { 
    this.icono = 'favorite_border';
    this.state = 1;
    this.nstate = 1;
    this.favorited = {}
  }

  userP:UserProfile;
  fKeys;
  fVals;

  ngOnInit(): void {
    this.userQuery.selectUserProfile$.subscribe((profile) => (this.userP = profile));
    this.favoriteService.getFavorites(this.userP.userId.toString()).subscribe((user) => {
      this.favorited = user.favorites;
      this.fKeys = Object.keys(this.favorited);
      this.fVals = Object.values(this.favorited);
    });
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
    console.log(this.favorited);
    var j = parseInt(i);
    var tempUser:User = {uid: this.userP.userId.toString(), name: this.userP.fullName, email: this.userP.userAccount, favorites: this.favorited};
    console.log(tempUser);
    console.log(i);
    console.log(b);
    console.log(this.favorited[i]==undefined);
    if(b && this.favorited[i]==undefined){
      this.favoriteService.addToFavorites(tempUser, i, "https://angular.io/tutorial").subscribe((user) => {
        this.favorited = user.favorites
        this.fKeys = Object.keys(this.favorited);
        this.fVals = Object.values(this.favorited);
      });
    }
    else if(!b && this.favorited[i]!=undefined){
      this.favoriteService.removeFromFavorites(tempUser, i).subscribe((user) => {
        this.favorited = user.favorites
        this.fKeys = Object.keys(this.favorited);
        this.fVals = Object.values(this.favorited);
      });
    }
    //We found the Way
  }

  // onErase(b: boolean, i: string){
  //   var j = parseInt(i);
  //   var tempUser:User = {uid: this.userP.userId.toString(), name: this.userP.fullName, email: this.userP.userAccount, favorites: this.favorited};
  //   if(!b && this.favorited[j]!=undefined){
  //     this.favoriteService.removeFromFavorites(tempUser, i);
  //   }
  // }

}

