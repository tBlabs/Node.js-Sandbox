import { injectable } from 'inversify';
import 'reflect-metadata'
import { User } from './../framework/User';
import { v4 } from 'uuid';
import { decode, encode } from 'jwt-simple';
import { Claims } from "../framework/User";
import { guid } from "../types";

export class Payload
{
    userId: guid;
    userClaims: Claims;

    random: guid;
    creationTime: Date;
    expirationTime: Date;

    constructor()
    {
        this.random = v4();
        this.creationTime = new Date();
        this.expirationTime = new Date();
    }
}

@injectable()
export class Auth
{
    private secret = "kjlvsakjlfwopnt45kjfddsvbjksadfljgdlsfkjgdsklfjg";

    public GenerateTokenForUser(user: User): string
    {
        let payload = new Payload();
        payload.userId = user.id;
        payload.userClaims = user.claims;
        payload.expirationTime.setDate(payload.creationTime.getDate() + 100); // +100 days

        return encode(payload, this.secret);      
    }

    ExtractUserFromToken(token: string): User
    {
        let payload: Payload = decode(token, this.secret, false);

        let user: User = new User();
        user.id = payload.userId;
        user.claims = payload.userClaims;

        return user;
    }
}