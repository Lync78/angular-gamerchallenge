import { Participation_Voter } from "./participation_voter";

export interface Participation {
    id: number,
    urlVideo: string,
    participationsVoter: Participation_Voter[],
}