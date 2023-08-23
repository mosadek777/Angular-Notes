import { ToastrService } from 'ngx-toastr';

import { AuthService } from './../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteDataComponent } from '../note-data/note-data.component';
import { NoteService } from 'src/app/core/services/note.service';
import { Notes } from 'src/app/core/interfaces/notes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private _noteService: NoteService,
    private _authService: AuthService,
    private _toaster:ToastrService
  ) {}

  notes: Notes[] = [];
  value = '';


  ngOnInit(): void {
    this.getAllNotes();
  }



  openDialog() {
    const dialogRef = this.dialog.open(NoteDataComponent);

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res === 'NoteAdd') {
          this.getAllNotes();
        }
      },
    });
  }

  setData(note:any):void{
    const matDialogReF= this.dialog.open(NoteDataComponent,{
      data:{note}
    })    

    matDialogReF.afterClosed().subscribe({
      next:(res)=>{
        if (res ==="updated") {
          this.getAllNotes()
        }
      }
    })
  }




  getAllNotes(): void {
    const newModel = {
      token: localStorage.getItem('userToken'),
      userID: this._authService.userDetails.getValue()._id,
    };
    this._noteService.getUserNotes(newModel).subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.notes = res.Notes;
        }
      },
    });
  }


  deleteNote(id:string,index:number):void{
    const model = {
      NoteID:id,
      token:localStorage.getItem('userToken')
    }
    this._noteService.deleteNote(model).subscribe({
      next:(res)=>{
        if (res.message === "deleted") {
          this._toaster.warning(res.message)
         this.notes.splice(index,1)
        
         this.notes = [...this.notes]
        }
      }
    })
  }




  logOut():void{
    this._authService.logOut()
  }
}
