import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SettingComponent } from './setting/setting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MemberComponent } from './member/member.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [
  { path: 'schedule', component: ScheduleComponent },
  { path: 'member', component: MemberComponent },
  { path: 'setting', component: SettingComponent },
  { path: 'notfound', component: NotFoundComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'notfound', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
