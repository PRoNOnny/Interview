import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import member from '../../assets/member.json';
import department from '../../assets/department.json';
import branch from '../../assets/branch.json';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  private department = new BehaviorSubject<any>(department);
  selecteddepartment = this.department.asObservable();

  private branch = new BehaviorSubject<any>(branch);
  selectedbranch = this.branch.asObservable();

  private member = new BehaviorSubject<any>(member);
  selectedmember = this.member.asObservable();

  constructor(private http: HttpClient) {
  }

  setMember(member: any) {
    this.member.next(member);
  }

  setDepartment(department: any) {
    this.department.next(department);
  }

  setBranch(branch: any) {
    this.branch.next(branch);
  }
}
