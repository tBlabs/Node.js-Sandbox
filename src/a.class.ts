import { injectable } from "inversify";
import 'reflect-metadata';
import { B } from "./b.class";

@injectable()
export class A
{
    constructor(b: B)
    {
        console.log("A constructed");     
    }
}