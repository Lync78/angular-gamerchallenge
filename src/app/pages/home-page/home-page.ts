import { Component, signal, inject, effect, computed } from '@angular/core';
import { Challenge } from "../../core/types/challenge";
import { ChallengeRequest } from "../../core/services/challengeRequest";
import { Router, RouterLink } from "@angular/router";
import { ChallengeCard } from "../../components/challenge-card/challenge-card";

@Component({
  imports: [RouterLink, ChallengeCard],
  selector: 'app-home-page',
  styleUrl: './home-page.css',
  templateUrl: './home-page.html',
})
export class HomePage {
  readonly isLoading = signal<boolean>(false);
  private readonly challenges = signal<Challenge[]>([]);
  readonly featureChallenges = computed(() => this.challenges().filter(challenge => challenge.status).sort((challengeA,challengeB) => (challengeB.voter?.length ?? 0) - (challengeA.voter?.length ?? 0)).slice(0,9));
  readonly error = signal<string|null>('');
  readonly challengeRequest = inject(ChallengeRequest);

  constructor() {
    this.getChallenges();
  }

  ngOnInit(): void {
    this.featureChallenges();
  }

  private getChallenges(){
    this.challengeRequest.challenges().subscribe({
      next: (data) => {
        this.challenges.set(data);
      },
      error: (err) => {
        this.isLoading.set(true);
        this.error.set('Impossible de récupérer les challenges');
      }
    })
  }
}
