import { User } from "./user";
import { Jeu } from "./jeu";
import { Voter } from "./voter";
import { Participation } from "./participation";

export interface Challenge {
    id: number,
    title: string,
    slug: string,
    url_video: string,
    description: string,
    rules: string[],
    status: boolean,
    jeu: Jeu,
    participations: Participation[],
    user: User,
    countVoter: number,
    userLike: boolean,
    hasParticipation: boolean,
    image: string | null,
    voter: Voter[],
    createdAt: Date,
    closeAt: Date,
}