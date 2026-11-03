import { Service, Injectable, signal } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import {Observable, tap, catchError, throwError, map } from "rxjs";
import { BaseService } from "./baseService";
import { Auth as User } from "../types/auth";

@Injectable({providedIn: 'root'})
export class Auth extends BaseService {

  private userSignal = signal<User| null>(null);

  user = this.userSignal.asReadonly();

  constructor(http: HttpClient){
    super(http);
  }

  login(email: string, password: string): Observable<User>{
    return this.http.post<User>(`${this.apiUrl}/auth/login`, {email,password},{headers: this.headers}).pipe(
      tap(data => this.userSignal.set({
        id: data.id,
        email: data.email,
        username: data.username,
        role: data.role,
        avatar: data.avatar,
      })),
      catchError(error => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  logout(): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/auth/logout`,{ withCredentials: true }).pipe(
      tap(user => this.userSignal.set(null)),
      catchError(error => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  checkAuthentication(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/auth/me`,{headers: this.headers, withCredentials: true }).pipe(
      tap(user => this.userSignal.set(user)),
      catchError(error => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }
}
