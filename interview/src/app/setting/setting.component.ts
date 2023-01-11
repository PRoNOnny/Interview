import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ShareDataService } from '../service/share-data.service';
import { BranchComponent } from './branch/branch.component';
import { DepartmentComponent } from './department/department.component';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  branch: any
  department: any
  search:any = {dep: '', br:''}
  displayedColumnsBranch: string[] = ['number', 'branch', 'department', 'option']
  displayedColumnsDepartment: string[] = ['number', 'department', 'type', 'option']

  constructor(
    public dialog: MatDialog,
    private shareData: ShareDataService
  ) { }

  ngOnInit(): void {

    this.shareData.selecteddepartment.subscribe((department) => {
      this.department = department
    })

    this.shareData.selectedbranch.subscribe((branch) => {
      this.branch = branch.map((br: any) => {
        const dep = this.department.find((dep: any) => dep.id == br.departmentId)
        br.department = dep.department
        return br
      })
    })
  }

  addBranch() {
    const dialogRef = this.dialog.open(BranchComponent, {
      width: '350px',
      data: {
        title: 'Add Branch',
        branch: this.branch,
        department: this.department
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let data = {
          id: result.id,
          branch: result.branch,
          departmentId: result.depId
        }
        const allBranch = [...this.branch, data]
        this.shareData.setBranch(allBranch)
      }
    });
  }

  editBranch(data: any, index: number) {
    const dialogRef = this.dialog.open(BranchComponent, {
      width: '350px',
      data: {
        title: 'Edit Branch',
        branch: this.branch,
        department: this.department,
        data: data
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.branch[index].branch = result.branch
        this.branch[index].departmentId = result.id
        this.branch[index].department = result.department
      }
    });
  }

  addDepartment() {
    const dialogRef = this.dialog.open(DepartmentComponent, {
      width: '350px',
      data: {
        title: 'Add Department',
        department: this.department
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const allDepartment = [...this.department, result]
        this.shareData.setDepartment(allDepartment)
      }
    });
  }

  editDepartment(data: any, index: number) {
    const dialogRef = this.dialog.open(DepartmentComponent, {
      width: '350px',
      data: {
        title: 'Edit Department',
        department: this.department,
        data: data
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.department[index].department = result.department
        this.department[index].type = result.type
      }
    });
  }

  deleteDepartment(index: number) {
    Swal.fire({
      icon: 'warning',
      title: 'Do you want to delete?',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      customClass: {
        title: 'title-sweet',
        htmlContainer: 'html-sweet',
        confirmButton: 'confirm-sweet',
        cancelButton: 'cancel-sweet',
        popup: 'popup-sweet',
        closeButton: 'close-sweet',
        icon: 'icon-sweet',
        actions: 'action-sweet'
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {

        this.department[index] = ''
        let dep = this.department.filter((dep:any) => dep != '')
        this.shareData.setDepartment(dep)

      } else if (result.dismiss === Swal.DismissReason.cancel ||
        result.dismiss === Swal.DismissReason.backdrop ||
        result.dismiss === Swal.DismissReason.esc) {

      }
    })
  }

  deleteBranch(index: number) {
    Swal.fire({
      icon: 'warning',
      title: 'Do you want to delete?',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      customClass: {
        title: 'title-sweet',
        htmlContainer: 'html-sweet',
        confirmButton: 'confirm-sweet',
        cancelButton: 'cancel-sweet',
        popup: 'popup-sweet',
        closeButton: 'close-sweet',
        icon: 'icon-sweet',
        actions: 'action-sweet'
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {

        this.branch[index] = ''
        let br = this.branch.filter((br:any) => br != '')
        this.shareData.setBranch(br)

      } else if (result.dismiss === Swal.DismissReason.cancel ||
        result.dismiss === Swal.DismissReason.backdrop ||
        result.dismiss === Swal.DismissReason.esc) {

      }
    })
  }

}
