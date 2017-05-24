import { HandlerException } from "../../framework/HandlerException";

export class WrongPasswordException extends HandlerException
{
    message = "Wrong password";
    statusCode = 401;
}