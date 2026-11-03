import { Injectable } from '@angular/core';
import { faTrophy, faHouse, faRankingStar, faArrowRight, faGamepad, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import { faDiscord, faTwitch, faYoutube, faXTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

@Injectable({
    providedIn: 'root'
})
export class FontAwesome {
    readonly faHouse = faHouse;
    readonly faTrophy = faTrophy;
    readonly faRankingStar = faRankingStar;

    readonly faDiscord = faDiscord;
    readonly faTwitch = faTwitch;
    readonly faYoutube = faYoutube;
    readonly faXTwitter = faXTwitter;
    readonly faInstagram = faInstagram;

    readonly faArrowRight = faArrowRight;
    readonly faGamepad = faGamepad;
    readonly faHeart = faHeart;
    readonly faUser = faUser;
}
