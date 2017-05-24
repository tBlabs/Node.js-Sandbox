import { HandlerException } from "../../framework/HandlerException";

export class UserNotFoundException extends HandlerException
{
    message = "User not found";
    statusCode = 404;
}