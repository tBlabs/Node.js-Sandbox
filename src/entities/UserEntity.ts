import { guid } from "../types";
import { Claims } from "../framework/User";

export class UserEntity
{
    id: guid;
    email: string;
    pass: string;
    claims: Claims;
    insertTime: Date;
    lastLoginTime: Date;
}