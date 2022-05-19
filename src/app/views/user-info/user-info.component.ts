import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { FavoriteService } from "src/app/services/favorite.service"
import { Url } from 'url';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})

export class UserInfoComponent implements OnInit {
	url: any; //Angular 11, for stricter type
  constructor(
    private favoriteService: FavoriteService
  ) { 
	this.url = ('https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png');
  }
  title = 'User ';
  ngOnInit(): void {
  }
	
	//selectFile(event) { //Angular 8
	selectFile(event: any) { //Angular 11, for stricter type
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.url = new URL("https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png");
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.url = new URL("https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png");
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			//this.msg = null;
			this.url = reader.result; 
		}
	}

  /*favorited = this.favoriteService.getFavorites();
  fKeys = Object.keys(this.favorited);
  fVals = Object.values(this.favorited);*/

}
