import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { FavoriteService } from "src/app/services/favorite.service"

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})

export class UserInfoComponent implements OnInit {

  constructor(
    private favoriteService: FavoriteService
  ) { }
  title = 'User ';
  ngOnInit(): void {
  }

  favorited = this.favoriteService.getFavorites();
  fKeys = Object.keys(this.favorited);
  fVals = Object.values(this.favorited);

}
