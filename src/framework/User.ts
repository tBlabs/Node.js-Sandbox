import { guid } from "../types";

export class Claims
{
    canAddNote: boolean = false;
    canReadNote: boolean = false;
    canDeleteNotes: boolean = false;
    canChangeNote: boolean = false;
}

export class User
{
    id: guid;
    claims: Claims;
}