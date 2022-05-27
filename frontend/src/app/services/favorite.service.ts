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
  private apiUrl = "http://localhost:5000/api"
  constructor(private http: HttpClient) {}
  addToFavorites(user: User, id: string, link: string): Observable<User>{
    return this.http.post<User>(this.apiUrl + '/addFavorite/' + user.uid, {[id]: link}, options);
  	
  }

  removeFromFavorites(user: User, id: string): Observable<User>{
  
    return this.http.post<User>(this.apiUrl+"/removeFavorite/" + user.uid, {["favorites."+id]: ""}, options)

  }

  getFavorites(id: string): Observable<User>{
  	 return this.http.get<User>(this.apiUrl+"/favorites/"+id);
  }
}
