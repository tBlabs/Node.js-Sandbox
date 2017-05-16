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

    Handle(query: LoginQuery, context: Context): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {      
            this._db.Open('users').then((usersCollection) =>
            {
                usersCollection.findOneAndUpdate({ email: query.email }, 
                    { $set: { lastLoginTime: new Date() } })
                    .then((entry: FindAndModifyWriteOpResultObject) =>
                {
                  //  if ((entry.ok != 1) || (entry.value == null)) return reject(new UserNotFoundException());
                    if ((entry.ok != 1) || (entry.value == null)) throw new UserNotFoundException();

                    let userEntity: UserEntity = entry.value;

                //    if (userEntity.password != query.password) return reject(new WrongPasswordException());
                    if (userEntity.password != query.password) throw new WrongPasswordException();
                                   
                    let user = new User();
                    user.id = userEntity.id;
                    user.claims = userEntity.claims;

                    let token = this._auth.GenerateTokenForUser(userEntity);

                    return resolve(token);
                });
            });
        });
    }
}


