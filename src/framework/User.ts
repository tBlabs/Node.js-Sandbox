import { guid } from "../types";
import { Claims } from "./Claims";

export class User
{
    public id: guid;
    public claims: Claims;

    constructor()
    {
        this.claims = new Claims();
    }
}