import { HandlerException } from "../../framework/HandlerException";
import { IHttpStatusCode } from "../../framework/IHttpStatusCode";

export class UserAlreadyExistsException extends HandlerException implements IHttpStatusCode
{
    message = "Email taken";
    statusCode = 406;
}