import { Service, Injectable, signal } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import {Observable, tap } from "rxjs";

interface User {
    id: number;
    email: string;
}


@Injectable({providedIn: 'root'})
export class Auth {

  private headers = new HttpHeaders({'Content-Type':'application/json'});

  private apiUrl = "http://guillaume.lan:3000/api";

  private userSignal = signal<User| null>(null);

  user = this.userSignal.asReadonly();

  constructor(private http: HttpClient){}

  login(email: string, password: string): Observable<User>{
    return this.http.post<User>(`${this.apiUrl}/auth/login`, {email,password},{headers: this.headers}).pipe(tap(user => this.userSignal.set(user)));
  }

  logout(): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/auth/logout`,{ withCredentials: true }).pipe(tap(user => this.userSignal.set(null)));
  }

  checkAuthentication(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/auth/me`,{headers: this.headers, withCredentials: true }).pipe(tap(user => this.userSignal.set(user)));
  }
}
