import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../shared/models/user';
import { GameService } from '../shared/services/gameService';
import { first } from 'rxjs/operators';
import { Game } from '../shared/models/game';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CreateGame } from '../shared/models/createGame';
import { MatDialog } from '@angular/material/dialog';
import { AddGameComponent } from './add-game.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  currentUser: User;
  dataSource: Game[] = [];
  columnsToDisplay = ['name', 'rating', 'releaseDate', 'edit'];
  expandedElement: Game;
  createGameData: CreateGame;
  animal: string;
  name: string;
  loading: boolean;

  constructor(private gameService: GameService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.retrieveGames();
  }

  private retrieveGames() {
    this.loading = true;

    this.gameService.getAll().pipe(first()).subscribe(games => {

      this.dataSource = games;
      this.loading = false;
    });
  }

  add() {
    this.dialog.open(AddGameComponent).afterClosed().subscribe(() => {
      this.retrieveGames();
    });
  }

  editGame(e: MouseEvent, game: Game) {
    e.stopPropagation();
    this.dialog.open(AddGameComponent, { data: { game } }).afterClosed().subscribe(() => {
      this.retrieveGames();
    });
  }

  deleteGame(e: MouseEvent, game: Game) {
    e.stopPropagation();
    this.gameService.deleteGame(game.id).subscribe(res => {
      this.retrieveGames();
    });
  }

  getColumnsToDisplay(element: Game) {
    const columns = [...this.columnsToDisplay];
    if (this.expandedElement === element) {
      columns.push('expandedDetail');
    }
    return columns;
  }

  toggleExpanded(element: Game) {
    if (this.expandedElement === element) {
      this.expandedElement = undefined;
    } else {
      this.expandedElement = element;
    }
  }

  toDate(date: string) {
    return new Date(date);
  }
}