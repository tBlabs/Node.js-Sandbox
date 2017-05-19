import { UserEntity } from './../../entities/UserEntity';
import { injectable, Container } from 'inversify';
import 'reflect-metadata';
import { IMessageHandler } from "../../cqrs/IQuery.interface";
import { Context } from "../../framework/Context";
import { Database } from "../../database/Database";
import { Auth } from "../../services/auth";
import { UserNotFoundException } from "../exceptions/UserNotFoundException";
import { WrongPasswordException } from "../exceptions/WrongPasswordException";
import { User } from "../../framework/User";
import { FindAndModifyWriteOpResultObject } from "@types/mongodb";
import { LoginQuery } from "../../messages/auth/LoginQuery";
import { AssignMessage } from "../../decorators/AssignMessage";


@AssignMessage(LoginQuery)
@injectable()
export class LoginQueryHandler implements IMessageHandler
{
    constructor(private _db: Database, private _auth: Auth) { }

    public async Handle(query: LoginQuery, context: Context): Promise<string>
    {
        let usersCollection = await this._db.Open('users');

        let entry: FindAndModifyWriteOpResultObject = await usersCollection.findOneAndUpdate(
            { email: query.email },
            { $set: { lastLoginTime: new Date() } }
        );

        if ((entry.ok != 1) || (entry.value == null))
        {
            throw new UserNotFoundException();
        }

        let userEntity: UserEntity = entry.value;

        if (userEntity.password != query.password)
        {
            throw new WrongPasswordException();
        }

        let user = new User();
        user.id = userEntity.id;
        user.claims = userEntity.claims;

        let token: string = this._auth.GenerateTokenForUser(userEntity);

        return token;
    }
}


