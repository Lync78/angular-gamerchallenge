import { Service, Injectable, signal, inject } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import {Observable, tap, catchError, throwError, map } from "rxjs";
import { Challenge } from "../types/challenge";
import { Participation } from "../types/participation";
import { BaseService } from "./baseService";
import { Voter } from "../types/voter";
import { Participation_Voter } from "../types/participation_voter";
import { Auth } from "./auth.service";

@Injectable({providedIn: 'root'})
export class ChallengeRequest extends BaseService {

  private challengeSignal = signal<Challenge[]| null>(null);
  
  private auth = inject(Auth);

  constructor(http: HttpClient){
    super(http);
  }

  private getYoutubeVideoId(url: string): string|null {
    try {
      const videoUrl = new URL(url);

      if(videoUrl.hostname === "youtu.be"){
        return videoUrl.pathname.split("/")[1] || null;
      }

      if(videoUrl.pathname.startsWith("/live/") || videoUrl.pathname.startsWith("/shorts/") ||videoUrl.pathname.startsWith("/embed/")){
        return videoUrl.pathname.split("/")[2] || null;
      }

      if ( videoUrl.hostname === "youtube.com" || videoUrl.hostname === "www.youtube.com" || videoUrl.hostname === "m.youtube.com") {
        return videoUrl.searchParams.get("v");
      }

      return null;
    } catch {
      return null;
    }
  }

  private getYoutubeThumbnailUrl(videoUrl: string): string | null {
    const videoId = this.getYoutubeVideoId(videoUrl);

    if (!videoId) {
      return null;
    }

    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  challenges(): Observable<Challenge[]>{
    return this.http.get<Challenge[]>(`${this.apiUrl}/challenges`).pipe(
      tap(data => {
        data.map(challenge => ({
        id: challenge.id,
        title: challenge.title,
        slug: challenge.slug,
        description: challenge.description,
        status: challenge.status,
        rules: challenge.rules,
        createdAt: challenge.createdAt,
        closeAt: challenge.closeAt,
        url_video: challenge.url_video,
        jeu: { id: challenge.jeu.id, title: challenge.jeu.title },
        voter: challenge.voter.map(el => ({
          challenge_id: el.challenge_id,
          user_id: el.user_id,
        })),
        countVoter: challenge.voter.length,
        user: { id: challenge.user.id, username: challenge.user.username, avatar: challenge.user.avatar },
        participations: [],
        image: this.getYoutubeThumbnailUrl(challenge.url_video),
        userLike: false,
        hasParticipation: false,
        }))
      }),
      catchError(error => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  challengesBySlug(slug: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/challenges/${slug}`).pipe(
      map(data => JSON.parse(data)),
      catchError(error => {
        if(error.status == 0){
          console.error(this.error);
        } else {
          console.error(error);
        }

        return throwError(() => error);
      })
    )
  }
}
