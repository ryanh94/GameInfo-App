import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { Injectable } from '@angular/core';
import { Game } from '../models/game';
import { UserService } from './userService';
import { UpdateGame } from '../models/updateGame';
import { CreateGame } from '../models/createGame';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private http: HttpClient, private userService: UserService) {
  }
  getAll() {
    return this.http.get<Game[]>('Game');
  }
  createGame(game: CreateGame) {
    return this.http.post<UpdateGame>('Game', game);
  }
  updateGame(id: number, game: UpdateGame) {
    return this.http.put<UpdateGame>('Game/' + id, game);
  }
  deleteGame(id: number){
    return this.http.delete<number>('Game/' + id);
  } 
}