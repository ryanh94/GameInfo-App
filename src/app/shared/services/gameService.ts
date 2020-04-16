import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { Injectable } from '@angular/core';
import { TokenHelper } from '../../helpers/TokenHelper';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  readonly baseUrl = environment.APIUrl;
  constructor(private http: HttpClient, public thelper: TokenHelper) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }
  getAll() {
    return this.http.get<Game []>(this.baseUrl + '/Game/GetAll', {
        headers: new HttpHeaders().set('Authorization', this.thelper.GetToken()),
      });
}
}
