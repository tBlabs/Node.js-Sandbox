import { UserEntity } from './../../entities/UserEntity';
import { injectable, Container } from 'inversify';
import 'reflect-metadata';
import { AssignMessage } from "../../cqrs/cqrs";
import { LoginQuery } from "../../messages/LoginQuery";
import { IMessageHandler } from "../../cqrs/IQuery.interface";
import { Context } from "../../framework/Context";
import { Database } from "../../database/Database";
import { Auth } from "../../services/auth";
import { UserNotFoundException } from "../exceptions/UserNotFoundException";
import { WrongPasswordException } from "../exceptions/WrongPasswordException";
import { User } from "../../framework/User";
import { FindAndModifyWriteOpResultObject } from "@types/mongodb";


@AssignMessage(LoginQuery)
@injectable()
export class LoginQueryHandler implements IMessageHandler
{
    constructor(private _db: Database, private _auth: Auth) { }

    Handle(query: LoginQuery, context: Context): Promise<any>
    {
  
        return new Promise((resolve, reject) =>
        {
            this._db.Open('users').then((usersCollection) =>
            {
                usersCollection.findOneAndUpdate
                (
                    { email: query.email }, 
                    { $set: { lastLoginTime: new Date() } },
                   )
                    .then((entry: FindAndModifyWriteOpResultObject) =>
                {
                    if ((entry.ok != 1) || (entry.value == null)) return reject(new UserNotFoundException());


                    let UserEntity: UserEntity = entry.value;

                    if (UserEntity.pass != query.password) return reject(new WrongPasswordException());
                                   
                    let user = new User();
                    user.id = UserEntity.id;
                    user.claims = UserEntity.claims;

                    let token = this._auth.GenerateTokenForUser(UserEntity);

                    return resolve(token);
                });
            });
        });
    }
}


