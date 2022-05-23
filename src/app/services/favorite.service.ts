import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from "../models/user.model"


const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})


export class FavoriteService {
  private apiUrl = "'http://localhost:5000/api"
  constructor(private http: HttpClient) {}
  addToFavorites(user: User, id: string, link: string){
    return this.http.put<User>(this.apiUrl + '/addFavorite' + user.id, item, options);
  	
  }

  removeFromFavorites(index: number){
  	
  }

  getFavorites(){
  	
  }
}
