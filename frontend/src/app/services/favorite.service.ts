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
  addToFavorites(user: User, id: string, link: string): Observable<User>{
    return this.http.post<User>(this.apiUrl + '/addFavorite' + user.id, {id: link}, options);
  	
  }

  removeFromFavorites(user: User, id: string){
  
    return this.http.post<User>(this.apiUrl+"/removeFavorite" + user.id, id, options)

  }

  getFavorites(): Observable<User>{
  	 return this.http.get<User>(this.apiUrl+"favorites");
  }
}
