import { injectable } from "inversify";
import 'reflect-metadata';


@injectable()
export class B
{
    constructor()
    {
        console.log("B constructed");     
    }
}


class CqrsBus
{
    Execute(message)
    {
        message.validate

        return {}
    }
}


class XHandler
{
    Handle(query)
    {
        query.validate
    }
}