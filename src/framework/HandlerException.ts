import { HttpStatusCode } from "../types";

export class HandlerException
{
    public message: string;
    public statusCode: HttpStatusCode;

    constructor(msg?: string, code?: HttpStatusCode)
    {
        this.message = msg;
        this.statusCode = code;
    }
}