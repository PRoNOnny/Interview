import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {
  department: any[] = []
  branchForm = new FormGroup({
    branch: new FormControl(),
    department: new FormControl()
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<BranchComponent>
  ) { }

  ngOnInit(): void {
    if (this.data.title == "Edit Branch") {
      this.branchForm.get('branch')?.patchValue(this.data.data.branch)
      this.branchForm.get('department')?.patchValue(this.data.data.departmentId)
    } 

    this.department = this.data.department.filter((dep:any) => dep.type == "multi")
  }

  padWithZeroes() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  submit() {
    let data = this.branchForm.value
    let dep:any = this.department.filter((dep:any) => dep.id == data.department)

    this.dialogRef.close({
      branch: data.branch,
      depId: dep[0].id,
      ...dep[0],
      id: this.data.title == "Edit Branch" ? this.data.data.id : this.padWithZeroes()
    })
  }

  toClose() {
    this.dialogRef.close()
  }
}
