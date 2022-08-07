import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAddress } from '../shared/models/address';
import { IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currenUserSource = new BehaviorSubject<IUser>(null);
  currentUser$ = this.currenUserSource.asObservable();
  constructor(private http: HttpClient, private router: Router) { }

  getCurrentUserValue() {
    return this.currenUserSource.value;
  }

  loadCurrentUser(token: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(this.baseUrl + 'account', { headers }).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currenUserSource.next(user);
        }
      })
    )
  }

  login(values: any) {
    return this.http.post(this.baseUrl + 'account/login', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currenUserSource.next(user);
        }
      }
      )
    )
  };

  register(values: any) {
    return this.http.post(this.baseUrl + 'account/register', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currenUserSource.next(user);
        }
      }
      )
    )
  };

  logout() {
    localStorage.removeItem('token');
    this.currenUserSource.next(null);
    this.router.navigateByUrl('/');
  };

  checkEmailExist(email: string) {
    return this.http.get(this.baseUrl + 'account/emailexist?email=' + email);
  };

  updateUserAddress(address:IAddress){
    return this.http.put<IAddress>(this.baseUrl+'account/UpdateUserAdress',address);
  }
  getUserAddress(){
    return this.http.get<IAddress>(this.baseUrl+'account/GetUserAddress');
  }
}
