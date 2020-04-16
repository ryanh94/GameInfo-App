import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/userModel';
import { Injectable } from '@angular/core';
import { tokenHelper } from '../../helpers/tokenHelper';
import { Game } from '../models/gameModel';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  readonly baseUrl = environment.APIUrl;
  constructor(private http: HttpClient, public thelper: tokenHelper) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }
  getAll() {
    return this.http.get<Game []>(this.baseUrl + '/Game/GetAll', {
        headers: new HttpHeaders().set('Authorization', this.thelper.GetToken()),
      });
}
}
