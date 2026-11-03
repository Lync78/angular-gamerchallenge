import { Service, Injectable, signal } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import {Observable, tap } from "rxjs";
import { User } from "../types/user";

export abstract class BaseService {

  protected headers = new HttpHeaders({'Content-Type':'application/json'});

  protected apiUrl = "http://guillaume.lan:3000/api";

  constructor(protected http: HttpClient){}

}