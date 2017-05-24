import { IMessageHandler } from './IQuery.interface';
import { container } from "../inversify.config";
import { Context } from "../framework/Context";
import { HandlerException } from "../framework/HandlerException";

export class Cqrs
{
    private static messageHandlers = {};

    public static PrintMessagesHandlers()
    {
        console.log("Handlers: ", this.messageHandlers);
    }

    public static RegisterMessageHandler(name: string, klass: any)
    {
        this.messageHandlers[name] = klass; // collection['messageName'] = messageClass
        container.bind(klass).toSelf();
    }

    private static ResolveMessageHandler(name): IMessageHandler
    {
        let n = Object.keys(this.messageHandlers).find(i => i === name);

        if (n === undefined) throw `Could not find handler for message "${ name }".`;

        return container.get(this.messageHandlers[n]) as IMessageHandler;
    }

    public static async Execute(messagePackage: any, context: Context): Promise<any>
    {
        try
        {
            //  console.log("messageAsText:", messageAsText);

            //   let messagePackage = JSON.parse(messageAsText);
            //  let messagePackage = messageAsText;   

             console.log(messagePackage);


            let messageName = Object.keys(messagePackage)[0]; // First key is a message class name
            let messageBody = messagePackage[messageName]; // Value of first key is message class body/properties

            console.log("Handling " + messageName + "...");
            console.log('with message:', messageBody);

            let messageHandler = this.ResolveMessageHandler(messageName);

            return messageHandler.Handle(messageBody, context);
        }
        catch (error)
        {
            console.log("CQRS EXECUTE ERROR: ", error);
            throw new HandlerException("Wrong message", 400);
        }
    }
}

