import { User } from "./User";

export class Context
{
    public user: User;

    constructor()
    {
        this.user = new User();
    }
}