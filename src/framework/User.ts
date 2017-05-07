import { guid } from "../types";

export class Claims
{
    canAddNote: boolean;
    canReadNote: boolean;
    canDeleteNotes: boolean;
    canChangeNote: boolean;
}

export class User
{
    id: guid;
    claims: Claims;
}