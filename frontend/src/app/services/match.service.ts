import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  matches: {[key: number]: [string,string]} = {};

  addToMatches(index: number, name: string, link: string){
  	this.matches[index]=[name,link];
  }

  removeFromMatches(index: number){
  	delete this.matches[index];
  }

  removeall() {
      for(var index in this.matches) {
        delete this.matches[index];
      }
  }

  getMatches(){
  	return this.matches;
  }
  constructor() { }
}
