import { Injectable } from '@angular/core';
import { faTrophy, faHouse, faRankingStar, faArrowRight, faGamepad, faHeart, faUser, faClock, faPlay, faUsers, faCalendarDays, faPen, faListUl, faArrowUpFromBracket, faLink  } from '@fortawesome/free-solid-svg-icons';
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

    readonly faClock = faClock;
    readonly faPlay = faPlay;
    readonly faUsers = faUsers;
    readonly faCalendarDays = faCalendarDays;
    readonly faPen = faPen;
    readonly faListUl = faListUl;
    readonly faArrowUpFromBracket = faArrowUpFromBracket;

    readonly faLink = faLink;

}
