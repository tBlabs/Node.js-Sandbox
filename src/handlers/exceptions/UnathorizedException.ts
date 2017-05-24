import { HandlerException } from "../../framework/HandlerException";

export class UnathorizedException extends HandlerException 
{
    message = "Unauthorized";
    statusCode = 401;
}