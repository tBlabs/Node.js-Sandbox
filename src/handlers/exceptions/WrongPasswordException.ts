import { HandlerException } from "../../framework/HandlerException";
import { IHttpStatusCode } from "../../framework/IHttpStatusCode";

export class WrongPasswordException extends HandlerException implements IHttpStatusCode
{
    message = "Wrong password";
    statusCode = 401;
}