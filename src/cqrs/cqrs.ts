import { IMessageHandler } from './IQuery.interface';
import { container } from "../inversify.config";
import { Context } from "../framework/Context";

/*
    This decorator need to be added to every handler class
    with appriopriate message (command or query) class.
*/
export function AssignMessage(messageClass: any)
{
    return function (target)
    {
        CqrsBus.RegisterMessageHandler(messageClass.name, target);
    }
}


export class CqrsBus
{
    private static dict = [];

    public static RegisterMessageHandler(name: string, klass: any)
    {
        this.dict[name] = klass;
        container.bind(klass).toSelf();
    }

    private static ResolveMessageHandler(name): IMessageHandler
    {
        let n = Object.keys(this.dict).find(i => i === name);

        if (n === undefined) throw `Could not find handler for message "${ name }".`;

        return container.get(this.dict[n]) as IMessageHandler;
    }

    public static Execute(messageAsText: string, context: Context): Promise<any>
    {
        let messagePackage = JSON.parse(messageAsText);

        let messageName = Object.keys(messagePackage)[0]; // First key is a message class name
        let messageBody = messagePackage[messageName]; // Value of first key is message class body/properties

        console.log("Handling", messageName, "...");
        console.log('Message =', messageBody);

        let messageHandler = this.ResolveMessageHandler(messageName);

        return messageHandler.Handle(messageBody, context);//.then((result) => console.log("Handle result:", result))
          //  .catch((err) => console.log("Handle error:", err));
    }
}

