import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favorites: {[key: number]: string} = {};

  addToFavorites(index: number, link: string){

  	this.favorites[index]=link;

  }

  removeFromFavorites(index: number){

  	delete this.favorites[index];

  }

  getFavorites(){

  	return this.favorites;

  }

  constructor() { }
}
