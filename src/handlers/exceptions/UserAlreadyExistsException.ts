import { HandlerException } from "../../framework/HandlerException";

export class UserAlreadyExistsException extends HandlerException
{
    message = "Email taken";
    statusCode = 406;
}