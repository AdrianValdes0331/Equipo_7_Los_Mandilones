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

  url: any; //Angular 11, for stricter type
	msg = "Please Select a Profile Image";
	
	//selectFile(event) { //Angular 8
	selectFile(event: any) { //Angular 11, for stricter type
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result; 
		}
	}

  favorited = this.favoriteService.getFavorites();
  fKeys = Object.keys(this.favorited);
  fVals = Object.values(this.favorited);

}
