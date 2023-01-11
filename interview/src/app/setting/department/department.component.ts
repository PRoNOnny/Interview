import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  departmentForm = new FormGroup({
    department: new FormControl(),
    type: new FormControl()
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DepartmentComponent>
  ) { }

  ngOnInit(): void {
    if (this.data.title == "Edit Department") {
      this.departmentForm.get('department')?.patchValue(this.data.data.department)
      this.departmentForm.get('type')?.patchValue(this.data.data.type)
    }
  }

  padWithZeroes() {
    return Math.floor(100000 + Math.random() * 900000)
  }

  submit() {
    let data = this.departmentForm.value
    this.dialogRef.close({
      id: this.data.title == "Edit Department" ? this.data.data.id : this.padWithZeroes(),
      ...data
    })
  }

  toClose() {
    this.dialogRef.close()
  }
}
