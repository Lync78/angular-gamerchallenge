import { Participation_Voter } from "./participation_voter";
import { User } from "./user";

export interface Participation {
    id: number,
    user_id: number,
    urlVideo: string,
    createdAt: Date,
    hasVote: boolean,
    hasParticipation: boolean,
    participationVoter: Participation_Voter[],
    user: User[],
}