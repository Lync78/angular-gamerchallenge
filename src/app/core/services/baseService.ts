import { Service, Injectable, signal } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import {Observable, tap } from "rxjs";

export abstract class BaseService {

  protected headers = new HttpHeaders({'Content-Type':'application/json'});

  protected apiUrl: string = "http://guillaume.lan:3000/api";

  protected error: string = "Impossible de contacter le domaine";

  constructor(protected http: HttpClient){}

}