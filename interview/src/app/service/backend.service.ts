import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  // requestMember() {
  //   this.http.get<any>('http://localhost:3000/member').pipe(timeout(10000)).subscribe({
  //     next: (response: any) => {
  //       console.log(response);
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     }
  //   })
  // }

  // requestDepartment() {
  //   this.http.get<any>('http://localhost:3000/depertment').pipe(timeout(10000)).subscribe({
  //     next: (response: any) => {
  //       console.log(response);
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     }
  //   })
  // }

  // requestBranch() {
  //   this.http.get<any>('http://localhost:3000/branch').pipe(timeout(10000)).subscribe({
  //     next: (response: any) => {
  //       console.log(response);
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     }
  //   })
  // }

  requestShortUrl(url:string, callback:any) {
    let headers = new HttpHeaders({
      url : url
    })

    this.http.get<any>('http://localhost:3000/url',{ headers : headers}).pipe(timeout(10000)).subscribe({
      next: (response: any) => {
        callback(response.url) 
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
