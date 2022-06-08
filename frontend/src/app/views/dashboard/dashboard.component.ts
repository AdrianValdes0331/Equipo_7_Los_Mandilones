import * as _ from 'lodash';
import { Image } from 'src/app/models/image.model';
import * as moment from 'moment';

import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { FavoriteService } from "src/app/services/favorite.service"
import { MatchService } from 'src/app/services/match.service';
import { ApplicationService } from 'src/app/services/application.service';
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
  newSearchForm: FormGroup;
  favorited: {[key: string]: string}

  constructor(
    private userQuery: UserQuery,
    private favoriteService: FavoriteService,
    private matchService: MatchService,
    private applicationService: ApplicationService,
    private router: Router,
    fb: FormBuilder
  ) { 
    this.icono = 'favorite_border';
    this.state = 1;
    this.nstate = 1;
    this.newSearchForm = new FormGroup({
      search_text: new FormControl('',Validators.required)
    })
    this.fillArray();
    this.favorited = {}
  }

  userP:UserProfile;
  fKeys;
  fVals;
  matched = this.matchService.getMatches();
  applications = this.applicationService.getApplications();
  aVals = Object.values(this.applications);
  aKeys = Object.keys(this.applications);
  mKeys = Object.keys(this.matched);
  mVals = Object.values(this.matched);

  search(application,data): boolean {
    return application.toLowerCase().includes(data.toLowerCase());
  }

  onSubmit(nState): void {
    //Se eliminan todos los matches previos para evitar acumulaciones
    this.matchService.removeall();
    //Se obtiene el input de la barra de busqueda
    var data = this.newSearchForm.get('search_text').value;
    //Verificamos que se haya insertado algo dentro de la barra de busqueda
    if(data == '') {
      alert('[ERROR]=Please add an input in the search box before you try searching for anything.');
    }
    else {
      //Se recorre cada una de las aplicaciones para encontrar matches
      for(let i = 0;i < this.aVals.length;i++) {
        var found = this.search(this.aVals[i][0],data);
        //En caso de haber match, se agrega a arreglo de matches
        if(found) {
          var key = parseInt(this.aKeys[i]);
          //Se verifica que no se tenga ya dentro del arreglo para evitar sobrecargas
          if(this.matchService.matches[key]==undefined) {
            this.matchService.addToMatches(key,this.aVals[i][0],this.aVals[i][1]);
          } 
        }
      }
      //Se actualizan los arreglos de matches
      this.mKeys = Object.keys(this.matched)
      this.mVals = Object.values(this.matched)
      //Se actualiza el estado para el despliegue de aplicaciones
      this.CheckState(nState);      
    }
  }

  ngOnInit(): void {
    this.userQuery.selectUserProfile$.subscribe((profile) => (this.userP = profile));
    this.favoriteService.getFavorites(this.userP.userId.toString()).subscribe((user) => {
      this.favorited = user.favorites;
      this.fKeys = Object.keys(this.favorited);
      this.fVals = Object.values(this.favorited);
    });
  }

  fillArray(){
    for(let i = 0;i < 12;i++) {
      this.applicationService.addToApplications(i,"Application" + i.toString(),"https://angular.io/tutorial")
    }
    this.aVals = Object.values(this.applications);
    this.aKeys = Object.keys(this.applications);
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

