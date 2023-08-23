import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { NoteService } from 'src/app/core/services/note.service';

@Component({
  selector: 'app-note-data',
  templateUrl: './note-data.component.html',
  styleUrls: ['./note-data.component.scss'],
})
export class NoteDataComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private _noteService: NoteService ,
    private _toaster:ToastrService,
    private _matDialogRef:MatDialogRef<NoteDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {}

  dataForm!: FormGroup;
  userData: any;

  ngOnInit(): void {
    this.createForm();
    this.userData = jwtDecode(localStorage.getItem('userToken')!);
    console.log(this.data);
  }

  createForm(): void {
    this.dataForm = this._formBuilder.group({
      title: [this.data ? this.data.note.title:'', [Validators.required]],
      desc: [this.data ? this.data.note.desc:'', [Validators.required]],
      token: localStorage.getItem('userToken'),
    });
  }

  sendData(): void {
    if (this.dataForm.valid) {
      if (this.data === null) {
        this.addNote();
      }else{
       this.updateData()
      }
     
    }
  }


 

  addNote(): void {
    const newData = {
      ...this.dataForm.value,
      citizenID: this.userData._id,
    };
    this._noteService.addNote(newData).subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this._toaster.success(res.message,`Note successfully added`)
          this._matDialogRef.close("NoteAdd")
        }
      },
    });
  }

  updateData():void{
    const model={
      ...this.dataForm.value,
      NoteID:this.data.note._id,
      token:localStorage.getItem("userToken"),
    }
    this._noteService.updateNote(model).subscribe({
      next:(res)=>{
        if (res.message ==="updated") {
          
          this._toaster.success(res.message,"updated successfully")
          this._matDialogRef.close("updated")
        }
      }
    })
  }
}
