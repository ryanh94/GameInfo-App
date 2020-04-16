import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../shared/models/user';
import { GameService } from '../shared/services/gameService';
import { first } from 'rxjs/operators';
import { Game } from '../shared/models/game';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CreateGame } from '../shared/models/createGame';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
      trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class HomeComponent implements OnInit{
  currentUser: User;
  dataSource: Game[] = [];
  columnsToDisplay = ['name', 'rating', 'releaseDate'];
  expandedElement: Game;
  createGameData: CreateGame;
  animal: string;
  name: string;

  constructor(private gameService: GameService, public dialog: MatDialog) {

  }
  ngOnInit() {
   this.retrieveGames();
  }

  private retrieveGames() {
    this.gameService.getAll().pipe(first()).subscribe(games => {
      this.dataSource = games;
    });
  }
  
  add(): void {
    const dialogRef = this.dialog.open(AddGameDialog, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      
    });
  }
}
@Component({
  selector: 'add-game',
  templateUrl: 'add-game.html',
})
export class AddGameDialog {

  constructor(
    public dialogRef: MatDialogRef<AddGameDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CreateGame) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

