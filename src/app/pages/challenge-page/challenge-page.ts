import { Component, signal, inject, effect, DestroyRef } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { ChallengeRequest } from "../../core/services/challengeRequest";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Challenge } from "../../core/types/challenge";
import { Participation } from "../../core/types/participation";
import { Participation_Voter } from "../../core/types/participation_voter";
import { User } from "../../core/types/user"; 
import { Auth } from "../../core/services/auth.service";

@Component({
  imports: [],
  selector: 'app-challenge-page',
  styleUrl: './challenge-page.css',
  templateUrl: './challenge-page.html',
})
export class ChallengePage {

  readonly isLoading = signal<boolean>(false);
  readonly error = signal<string|null>('');
  readonly challengeRequest = inject(ChallengeRequest);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  readonly challenge = signal<Challenge | null>(null);
  private auth = inject(Auth);
  readonly user = this.auth.user(); 

  constructor(){
    effect(() => console.log(this.user));
  }

  ngOnInit(){
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(async param => {
      const slug = param.get('slug');

      if(slug){
        const data = await this.getChallengeBySlug(slug);
        if(data){
          console.log(data);
          
          const participations : Participation[] = data.participation.map((element) => {
            
            const participationVoters : Participation_Voter[] = element.participation_voter.map((el : Participation_Voter) => {
              return {
                user_id: el.user_id,
                participation_id: el.participation_id,
              }
            });
            return {
              id: element.id,
              urlVideo: element.urlVideo,
              countParticipationVoter: element.participation_voter.length,
              user: { 
                user_id: element.user.id,
                username: element.user.username,
                avatar: element.user.avatar
              },
              participationVoters,
              hasVote: this.user ? participationVoters.some((el: Participation_Voter) => user.id === el.user_id) : false,
              createdAt: new Date(element.createdAt),
              updatedAt: new Date(element.updatedAt),
            };
          });
          

        }
      }
    })
  }

  private async getChallengeBySlug(slug: string){
    
    try {
      const data = await firstValueFrom(this.challengeRequest.challengesBySlug(slug));

      return data;
    } catch(err){
      this.isLoading.set(true);
      this.error.set("Impossible de récupérer le challenge");
      return null;
    }
      
  }
}
