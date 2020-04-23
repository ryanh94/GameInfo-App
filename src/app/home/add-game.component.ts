import { Component, Inject } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GameService } from '../shared/services/gameService';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'add-game',
  templateUrl: 'add-game.component.html',
  styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent {
  form: FormGroup;
  editing = false;
  id?: number;

  constructor(private gameService: GameService, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AddGameComponent>, @Inject(MAT_DIALOG_DATA) data) {
    let formValues = {
      name: '',
      rating: '',
      releaseDate: '',
      description: ''
    };

    Object.assign(formValues, data?.game);
    this.editing = !!(data?.game);
    this.id = data?.game?.id;
    console.log(this.id);

    this.form = this.formBuilder.group({
      name: [formValues.name, Validators.required],
      rating: [formValues.rating, Validators.required],
      releaseDate: [formValues.releaseDate, Validators.required],
      description: [formValues.description, Validators.required]
    });
  }

  onSubmit() {
    if (this.editing) {
      this.updateRecord(this.form);
    } else {
      this.insertRecord(this.form);
    }
  }

  insertRecord(form: FormGroup) {
    this.gameService.createGame(form.value).subscribe(res => {
      this.dialogRef.close();
    });
  }

  updateRecord(form: FormGroup) {
    this.gameService.updateGame(this.id, form.value).subscribe(res => {
      console.log('Updated');
      this.dialogRef.close();
    });
  }
}