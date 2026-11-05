import { BaseService } from "./baseService";
import { Service, Injectable, signal, inject } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import {Observable, tap, catchError, throwError, map } from "rxjs";
import { Auth } from "./auth.service";
import { Participation } from "../types/participation";

@Injectable({providedIn: 'root'})
export class ParticipationRequest extends BaseService {

  private participationSignal = signal<Participation| null>(null);
  
  private auth = inject(Auth);

  constructor(http: HttpClient){
    super(http);
  }


  async addParticipation(urlVideo: string, challengeId: number){
    try {
      const response = await fetch(`${this.apiUrl}/participations`, {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
        },
        credentials: "include",
        body: JSON.stringify({urlVideo: urlVideo, challenge_id: challengeId}),
      });

      if(response.ok){
        return response.json();
      }

      return "Impossible d'insérer les données";
    } catch(error){
      console.error(error);
      return throwError(() => error);
    }
  }

  async deleteVote(participationId: number){
    try {
      const response = await fetch(`${this.apiUrl}/participations/${participationId}/voter`,{
        method: "DELETE",
        headers: {
          "Content-Type":"application/json",
        },
        credentials: "include",
      });

      if(response.ok){
        return response;
      }

      return "Impossible de supprimer le vote";
    } catch(error){
      console.error(error);
      return throwError(() => error);
    }
  }

  async addVote(participationId: number){
    try {
      const response = await fetch(`${this.apiUrl}/participations/voter`,{
        method: "POST",
        headers: {
          "Content-Type":"application/json",
        },
        credentials: "include",
        body: JSON.stringify({participation_id: participationId}),
      });
      
      if(response.ok){
        return response;
      }

      return "Impossible d'ajouter le vote";
    } catch(error){
      console.error(error);
      return throwError(() => error);
    }
  }
}
