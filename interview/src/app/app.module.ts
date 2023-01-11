import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatMenuModule} from '@angular/material/menu';

import { BackendService } from './service/backend.service';
import { FrontendService } from './service/frontend.service';
import { ShareDataService } from './service/share-data.service';

import { SearchPipe } from './service/search.pipe';
import { OnlyNumberDirective } from './service/only-number.directive';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './navigator-bar/toolbar/toolbar.component';
import { MemberComponent } from './member/member.component';
import { SettingComponent } from './setting/setting.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MemberdialogComponent } from './member/memberdialog/memberdialog.component';
import { DepartmentComponent } from './setting/department/department.component';
import { BranchComponent } from './setting/branch/branch.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    MemberComponent,
    SettingComponent,
    NotFoundComponent,
    DashboardComponent,
    MemberdialogComponent,
    DepartmentComponent,
    BranchComponent,
    OnlyNumberDirective,
    SearchPipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    HttpClientModule,
    MatExpansionModule,
    MatCheckboxModule,
    DragDropModule,
    MatMenuModule
  ],
  providers: [
    BackendService,
    FrontendService,
    ShareDataService,
    OnlyNumberDirective,
    SearchPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
