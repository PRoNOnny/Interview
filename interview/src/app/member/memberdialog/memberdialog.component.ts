import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, MaxValidator, RequiredValidator } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-memberdialog',
  templateUrl: './memberdialog.component.html',
  styleUrls: ['./memberdialog.component.scss']
})
export class MemberdialogComponent implements OnInit {
  branch:any = []

  memberForm: FormGroup = new FormGroup({
    number: new FormControl(),
    name: new FormControl(),
    surname: new FormControl(),
    department: new FormControl(),
    branch: new FormControl()
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MemberdialogComponent>
  ) { }

  ngOnInit(): void {
    if (this.data.title == 'Edit Member') {
      let data = this.data.data
      this.memberForm.get('number')!.patchValue(data.number)
      this.memberForm.get('name')!.patchValue(data.name)
      this.memberForm.get('surname')!.patchValue(data.surname)
      this.memberForm.get('branch')!.patchValue(data.branchId)
      this.memberForm.get('department')!.patchValue(data.departmentId)

      this.branch = this.data.branch.filter((br:any) => br.departmentId == data.departmentId)
    }

  }

  displayBranch(event:any){
    this.branch = this.data.branch.filter((br:any) => br.departmentId == event.value)
  }

  submit() {
    let data = this.memberForm.value
    this.dialogRef.close(data)
  }

  toClose() {
    this.dialogRef.close()
  }
}
