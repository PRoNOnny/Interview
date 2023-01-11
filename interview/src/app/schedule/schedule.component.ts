import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { ShareDataService } from './../service/share-data.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';


export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})

export class ScheduleComponent implements OnInit {
member: any = []
  memberDisplay: any = []
  department: any = []
  branch: any = []
  day: any[] = []
  expand: boolean = true
  clickMem: number = 0
  clickBr: number = 0
  startAt: any = {}
  date = new FormControl(moment());

  displayedScheduleColumns: string[] = ['day'];
  datasource: any = []

  contextMenuPosition = { x: 0, y: 0 };
  @ViewChild(MatMenuTrigger) contextMenu!: MatMenuTrigger;

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  constructor(private shareData: ShareDataService) { }

  @HostListener('mousewheel', ['$event'])
  scroll(event: MouseEvent) {
    if (this.contextMenu.menuOpen) this.contextMenu.closeMenu()
  }

  @HostListener('click', ['$event'])
  closeMenu(event: MouseEvent) {
    if (this.contextMenu.menuOpen) this.contextMenu.closeMenu()
  }

  ngOnInit(): void {
    this.shareData.selectedbranch.subscribe((branch: any) => {
      this.branch = branch
    })

    this.shareData.selectedmember.subscribe((member: any) => {
      this.member = member.filter((el: any) => !el.branchId).map((el: any) => {
        return {
          ...el, tick: true
        }
      })

      this.branch = this.branch.map((el: any) => {
        return { ...el, tick: true, member: member.filter((ea: any) => ea.branchId == el.id) }
      })

    })

    this.shareData.selecteddepartment.subscribe((department: any) => {
      this.department = department
      this.displayedScheduleColumns = [...this.displayedScheduleColumns, ...department.map((el: any) => el.id)]

      this.day = this.daysInMonth(moment().month(), moment().year())
      this.datasource = this.day.map((el: any) => {
        let aa = [...department.map((el: any) => {
          let data: any = {}
          data[el.id] = el.id
          return data
        })]

        return {
          date: el.format('DD MMM YYYY'),
          day: el.format('dddd'),
          ...Object.assign({}, ...aa)
        }
      })

      this.memberDisplay = department.filter((dep: any) => dep.type == 'single').map((dep: any) => {
        return this.member.filter((mem: any) => {
          if (mem.departmentId == dep.id) {
            mem.department = dep.department
          }
          return mem.departmentId == dep.id
        })
      })

      this.branch = department.filter((dep: any) => dep.type == 'multi').map((dep: any) => {
        return this.branch.filter((branch: any) => {
          if (branch.departmentId == dep.id) {
            branch.department = dep.department
          }
          return branch.departmentId == dep.id
        })
      })
    })
  }

  daysInMonth(month: number, year: number) {
    var count = moment().month(month).year(year).daysInMonth();
    var days = [];
    for (var i = 1; i < count + 1; i++) {
      days.push(moment().month(month).date(i));
    }
    return days;
  }

  memberCheck(event: any, index: number, indexNest: number) {
    this.memberDisplay[index][indexNest].tick = event.checked
  }

  branchCheck(event: any, index: number, indexNest: number) {
    this.branch[index][indexNest].tick = event.checked
  }

  memberCheckAll(event: any, index: number) {
    this.memberDisplay[index].forEach((el: any) => {
      el.tick = event.checked
    });
  }

  branchCheckAll(event: any, index: number) {
    this.branch[index].forEach((el: any) => {
      el.tick = event.checked
    });
  }

  calculateWidth(dep: any) {
    let len = this.memberDisplay.length + (this.branch.length * 2)
    let part = dep.type == 'single' ? 1 : 2
    return `calc( (85% / ${len}) * ${part} )`
  }

  getSchedule() {
    let member: any = []

    for (let i = 0; i < this.memberDisplay.length; i++) {
      let mem: any = []
      let id = this.memberDisplay[i][0].departmentId
      let memAvaliable = this.memberDisplay[i].filter((m: any) => m.tick == true)
      do {
        if (memAvaliable.length == 0) {
          this.datasource.map((data: any) => {
            data[id] = ''
          })
          break
        }
        mem.push(...memAvaliable)
      } while (mem.length < this.datasource.length)
      mem.length = this.datasource.length
      member[id] = mem
    }

    for (let i = 0; i < this.branch.length; i++) {
      let br: any = []
      let id = this.branch[i][0].departmentId
      let brAvaliable: any = this.branch[i].filter((b: any) => b.tick == true)
      do {
        if (brAvaliable.length == 0) {
          this.datasource.map((data: any) => {
            data[id] = ''
          })
          break
        }
        br.push(...brAvaliable)
      } while (br.length < this.datasource.length)
      br.length = this.datasource.length
      member[id] = br
    }

    for (let key in member) {
      const index = this.startAt[key] ? this.startAt[key] : 0
      for (let i = 0; i + index < this.datasource.length; i++) {
        if (typeof this.datasource[i + index][key] != 'object') {
          this.datasource[i + index][key] = member[key][i]
        }
      }
    }

    this.datasource = [...this.datasource]
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();

    this.changeMonthYear(normalizedMonthAndYear.month(), normalizedMonthAndYear.year())
  }

  changeMonthYear(month: number, year: number) {
    this.day = this.daysInMonth(month, year)
    this.datasource = this.day.map((el: any) => {
      let aa = [...this.department.map((el: any) => {
        let data: any = {}
        data[el.id] = el.id
        return data
      })]

      return {
        date: el.format('DD MMM YYYY'),
        day: el.format('dddd'),
        ...Object.assign({}, ...aa)
      }
    })
  }

  selectChange(id:string){
    this.datasource.forEach((e:any) => {
      e[id] = id
    });
  }

  dateRangeInWeek(firstDate: Moment,) {
    var weekStart = firstDate.clone().startOf('isoWeek');
    var days = [];
    for (var i = 0; i <= 6; i++) {
      let date = moment(weekStart).add(i, 'days')
      if (date.isSame(firstDate, 'month'))
        days.push({ date: date });
    }
    return days;
  }

  displayTable(ele: any) {
    return ele?.hasOwnProperty('number')
  }

  menuOpen(event: MouseEvent, dep: any, index: number) {
    this.contextMenu.closeMenu();
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX;
    this.contextMenuPosition.y = event.clientY;
    let data: any = []

    setTimeout(() => {

      if (dep.type == 'single') {
        data = this.memberDisplay.filter((mem: any) => {
          return mem.some((m: any) => m.departmentId == dep.id)
        })

      } else {
        data = this.branch.filter((br: any) => {
          return br.some((b: any) => b.departmentId == dep.id)
        })
      }

      data = data[0].map((d: any) => {
        d.index = index
        return d
      })

      this.contextMenu.menuData = { item: data }
      this.contextMenu.openMenu()
    }, 150)
  }

  updateMemberTable(item: any) {
    this.datasource[item.index][item.departmentId] = item
  }

}
