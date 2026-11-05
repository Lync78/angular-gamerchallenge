import { Component, signal, inject, effect, DestroyRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { ChallengeRequest } from "../../core/services/challengeRequest";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Challenge } from "../../core/types/challenge";
import { Participation } from "../../core/types/participation";
import { Participation_Voter } from "../../core/types/participation_voter";
import { User } from "../../core/types/user"; 
import { Auth } from "../../core/services/auth.service";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FontAwesome } from '../../core/services/font-awesome';
import { DatePipe } from "@angular/common";
import { VoterRequest } from "../../core/services/voter-request";
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from "@angular/forms";
import { JsonPipe } from '@angular/common';
import { ParticipationRequest } from "../../core/services/participation-request";

@Component({
  imports: [FontAwesomeModule, RouterLink, DatePipe, ReactiveFormsModule],
  selector: 'app-challenge-page',
  styleUrl: './challenge-page.css',
  templateUrl: './challenge-page.html',
})
export class ChallengePage {

  readonly icons = inject(FontAwesome);
  readonly isLoading = signal<boolean>(false);
  readonly error = signal<string|null>('');
  readonly challengeRequest = inject(ChallengeRequest);
  readonly voterRequest = inject(VoterRequest);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  readonly challenge = signal<Challenge | null>(null);
  private auth = inject(Auth);
  readonly user = this.auth.user;
  readonly participationRequest = inject(ParticipationRequest);

  readonly form = new FormGroup({
    urlVideo: new FormControl("", [
      Validators.required,
      Validators.pattern(/^(https?:\/\/)?(www\.)?(youtu\.be\/|youtube\.com\/(watch\?v=|live\/|shorts\/|embed\/))[a-zA-Z0-9_-]{11}([?&].*)?$/),
    ]),
  });

  constructor(){
    effect(() => console.log(this.user()));
  }

  ngOnInit(){
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(async param => {
      const slug = param.get('slug');

      if(slug){
        await this.getChallengeBySlug(slug);
        console.log(this.challenge());
      }
    })
  }

  async handleLike(participation: Participation){
    const challenge = this.challenge();
    const user = this.user();

    if(challenge && user){
      // si true on considère qu'il veut supprimer le vote.
      if(participation.hasVote){
        const data = await this.participationRequest.deleteVote(participation.id);
        
        if(typeof data === "object" && data !== null){

          console.log(data);
          this.challenge.update(challenge => {
            if(challenge === null) return null;

            return {
              ...challenge,
              participations: challenge.participations.map(element =>
                element.id === participation.id ? {
                  ...element,
                  participationVoter: participation.participationVoter.filter((el) => el.user_id !== user.id) ?? [],
                  countParticipationVoter: element.participationVoter.length - 1,
                  hasVote: false,
                } : element
              )
            };
          });
        }
      }
      else {
        const data = await this.participationRequest.addVote(participation.id);
        
        if(typeof data === "object" && data !== null){
          this.challenge.update(challenge => {
            if(challenge === null) return null;

            return {
              ...challenge,
              participations: challenge.participations.map(element =>
                element.id === participation.id ? {
                  ...element,
                  participationVoter:[
                    ...element.participationVoter,
                    {user_id: user.id, participation_id: participation.id}],
                  countParticipationVoter: element.participationVoter.length + 1,
                  hasVote: true,
                } : element
              )
            };
          });
        }
      }
    }
  }

  async voterHandleLike(){

    const challenge = this.challenge();
    const user = this.user();

    if(challenge && user){

      // si userLike true, alors on supprime
      if(this.challenge()!.userLike){
        const data = await this.voterRequest.deleteVote(this.challenge()!.id);

        if(typeof data === "object" && data !== null){
          this.challenge.update(challenge => {
            if(challenge === null) return null;

            return {
              ...challenge,
              countVoter: challenge.countVoter - 1,
              userLike: false,
            }
          });
        }
      }
      else {
        const data = await this.voterRequest.addVote(this.challenge()!.id);

        if(typeof data === "object" && data !== null){
          this.challenge.update(challenge => {
            if(challenge === null) return null;

            return {
              ...challenge,
              countVoter: challenge.countVoter + 1,
              userLike: true,
            }
          })
        }
      }
    }
  }

  get urlVideo(){
    return this.form.get("urlVideo") as FormControl;
  }

  async handleSubmit(event: Event){
    event.preventDefault();
    const userCurrent = this.user();
    const challenge = this.challenge();
    const isFormValid = this.form.valid;

    if(isFormValid && challenge && userCurrent){
      const data = await this.participationRequest.addParticipation(this.urlVideo.value, challenge.id);
      if(typeof data === "object" && data !== null){
        this.challenge.update(currentChallenge => {
          if(currentChallenge === null) return null;

          return {
            ...currentChallenge,
            hasParticipation: true,
            participations: [
              ... currentChallenge.participations,
              {
                id: data.id,
                user_id: data.user_id,
                urlVideo: data.urlVideo,
                createdAt: new Date(data.createdAt),
                updatedAt: new Date(data.updatedAt),
                user: {
                  id: data.user.id,
                  username: data.user.username,
                  avatar: data.user.avatar,
                },
                participationVoter: [],
                hasVote: false,
                countParticipationVoter: 0,
              }
            ],
          }

        });
      }
    }
  }

  private async getChallengeBySlug(slug: string){
    
    const data = await this.challengeRequest.challengesBySlug(slug);
    const user = this.user();

    if(typeof data === 'object' && data !== null){

      const participations : Participation[] = data.participation.map((element) => {
          
        const participationVoter : Participation_Voter[] = element.participation_voter.map((el) => {
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
          participationVoter,
          hasVote: element.participation_voter.some((el) => user?.id === el.user_id),
          createdAt: new Date(element.createdAt),
          updatedAt: new Date(element.updatedAt),
        };
      });

      let hasParticipation : boolean = false;
      let userLike : boolean = false;

      if (user !== null) {
        userLike = data.voter.some((el) => el.user_id === user?.id);
        hasParticipation = data.participation.some((el) => user?.id === el.user_id );
      }

      const challenge : Challenge = {
        id: data.id,
        title: data.title,
        slug: data.slug,
        url_video: data.url_video,
        description: data.description,
        rules: data.rules,
        status: data.status,
        createdAt: data.createdAt,
        user: {
          id: data.user.id,
          username: data.user.username,
          avatar: data.user.avatar,
        },
        jeu: {
          id: data.jeu.id,
          title: data.jeu.title,
        },
        closeAt: data.closeAt,
        image: "",
        voter: [],
        countVoter: data.voter.length,
        userLike,
        participations,
        hasParticipation,
      };

      this.challenge.set(challenge);
    }

    this.error.set(data);
    
  }
}
