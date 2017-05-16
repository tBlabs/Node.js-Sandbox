import { guid } from "../types";
import { Claims } from "../framework/Claims";

export class UserEntity
{
    id: guid;
    email: string;
    password: string;
    claims: Claims;
    insertTime: Date;
    lastLoginTime: Date;
}