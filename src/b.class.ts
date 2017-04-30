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