import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  newDate(){
    return moment().format('DD MMM YYYY')
  }

  toSchedule(){
    this.router.navigate(['/schedule']);
  }

  toMember() {
    this.router.navigate(['/member']);
  }

  toSetting() {
    this.router.navigate(['/setting']);
  }

  toDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
