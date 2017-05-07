import { injectable, Container } from 'inversify';
import 'reflect-metadata';
import { IMessageHandler } from "../cqrs/IQuery.interface";
import { AssignMessage } from "../cqrs/cqrs";
import { LoginQuery } from "../messages/LoginQuery";
import { A } from "../services/a.class";
import { Context } from "../framework/Context";

@AssignMessage(LoginQuery)
@injectable()
export class LoginQueryHandler implements IMessageHandler
{
    constructor(a: A)
    {
        console.log("LoginQueryHandler constructed");
    }

    Handle(query: LoginQuery, context: Context): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            resolve("(value returned from LoginQueryHandler.Handle)");
        });
    }
}


