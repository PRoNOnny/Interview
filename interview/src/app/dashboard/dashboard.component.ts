import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from './../service/backend.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: []
})

export class DashboardComponent implements OnInit {
  value: any = ""
  longUrl:string = ""

  constructor(private router: Router, private back: BackendService) { }

  ngOnInit(): void {

  }

  shortUrl() {
    this.back.requestShortUrl(this.longUrl, (newUrl:string) => {
      this.value = newUrl
    })
  }

  toSchedule() {
    this.router.navigate(['/schedule']);
  }

}
