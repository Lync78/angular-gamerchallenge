import { Service, Injectable, signal, inject } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import {Observable, tap, catchError, throwError, map } from "rxjs";
import { BaseService } from "./baseService";
import { Auth } from "./auth.service";
import { Voter } from "../types/voter";

@Injectable({providedIn:'root'})
export class VoterRequest extends BaseService {

  private challengeSignal = signal<Voter| null>(null);
  
  private auth = inject(Auth);

  constructor(http: HttpClient){
    super(http);
  }

  async addVote(challengeId: number){
    try {
      const response = await fetch(`${this.apiUrl}/challenges/voter`,{
        method:"POST",
        headers: {
          "Content-Type":"application/json",
        },
        credentials: "include",
        body: JSON.stringify({challenge_id: challengeId}),
      });

      if(response.ok){
        return await response.json();
      }

      return "Impossible d'ajouter le vote";

    } catch(error){
      console.error(error);
      return throwError(() => error);
    }
  }

  async deleteVote(challengeId: number){

    try {
      const response = await fetch(`${this.apiUrl}/challenges/${challengeId}/voter`,{
        method:"DELETE",
        headers: {
          "Content-Type":"application/json",
        },
        credentials: "include",
      });

      if(response.ok){
        return await response.json();
      }

      return "Impossible de supprimer le vote";

    } catch(error){
      console.error(error);
      return throwError(() => error);
    }
  }
}
