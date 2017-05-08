import { HandlerException } from "../../framework/HandlerException";
import { IHttpStatusCode } from "../../framework/IHttpStatusCode";

export class UserNotFoundException extends HandlerException implements IHttpStatusCode
{
    message = "User not found";
    statusCode = 404;
}