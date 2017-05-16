import { HandlerException } from "../../framework/HandlerException";
import { IHttpStatusCode } from "../../framework/IHttpStatusCode";

export class UnathorizedException extends HandlerException implements IHttpStatusCode
{
    message = "Unathorized";
    statusCode = 403;
}