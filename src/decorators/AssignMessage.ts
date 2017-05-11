import { Cqrs } from "../cqrs/cqrs";

/*
    This decorator need to be added to every handler class
    with appriopriate message (command or query) class.
*/
export function AssignMessage(messageClass: any)
{
    return function (target)
    {
        Cqrs.RegisterMessageHandler(messageClass.name, target);
    }
}