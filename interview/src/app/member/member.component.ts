import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MemberdialogComponent } from './memberdialog/memberdialog.component';
import { ShareDataService } from './../service/share-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  member: any = []
  department: any = []
  branch: any = []
  search: string = ''
  displayedColumns: string[] = ['number', 'name', 'surname', 'branch', 'department', 'option'];

  constructor(
    public dialog: MatDialog,
    private shareData: ShareDataService
  ) { }

  ngOnInit(): void {

    this.shareData.selectedmember.subscribe((member: any) => {
      this.member = member
    })

    this.shareData.selecteddepartment.subscribe((department: any) => {
      this.department = department
      this.member = this.member.map((mem: any) => {
        let dep = department.filter((dep: any) => dep.id == mem.departmentId)
        mem['department'] = dep[0]?.department ? dep[0].department : ''
        return mem
      })
    })

    this.shareData.selectedbranch.subscribe((branch: any) => {
      this.branch = branch
      this.member = this.member.map((mem: any) => {
        let br = branch.filter((br: any) => br.id == mem.branchId)
        mem['branch'] = br[0]?.branch ? br[0].branch : ''
        return mem
      })
    })

  }

  addMember() {
    const dialogRef = this.dialog.open(MemberdialogComponent, {
      width: '350px',
      data: {
        title: 'Add Member',
        department: this.department,
        branch: this.branch
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const allMember = [...this.member, result]
        this.shareData.setMember(allMember)
      }
    });
  }

  editMember(data: any, index: number) {
    const dialogRef = this.dialog.open(MemberdialogComponent, {
      width: '350px',
      data: {
        title: 'Edit Member',
        data: data,
        department: this.department,
        branch: this.branch
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.member[index].number = result.number
        this.member[index].name = result.name
        this.member[index].surname = result.surname
        this.member[index].departmentId = result.department
        this.member[index].branchId = result.branch
      }
    });
  }

  deleteMember(index: string) {
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

        this.member[index] = ''
        let mem = this.member.filter((n: any) => n != '')
        this.shareData.setMember(mem)

      } else if (result.dismiss === Swal.DismissReason.cancel ||
        result.dismiss === Swal.DismissReason.backdrop ||
        result.dismiss === Swal.DismissReason.esc) {

      }
    })
  }

}
