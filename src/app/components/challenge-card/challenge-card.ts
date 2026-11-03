import { Component, signal, inject, input, effect } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FontAwesome } from '../../core/services/font-awesome';
import { Router, RouterLink } from '@angular/router';
import { Challenge } from "../../core/types/challenge";
import { DatePipe } from "@angular/common";

@Component({
  imports: [RouterLink, FontAwesomeModule, DatePipe],
  selector: 'app-challenge-card',
  styleUrl: './challenge-card.css',
  templateUrl: './challenge-card.html',
})
export class ChallengeCard {
  readonly icons = inject(FontAwesome);
  readonly challenge = input.required<Challenge>();
  constructor(){
    effect(() => {console.log(this.challenge())});
  }
}
