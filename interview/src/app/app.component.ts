import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'office';
  name: any
  route: string[] = ['/schedule', '/setting', '/member']

  constructor(private router: Router) {}

  showToolbar() {
    return this.route.some((r:any) => r == this.router.url)
  }
}
