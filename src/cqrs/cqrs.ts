import { IMessageHandler } from './IQuery.interface';
import { container } from "../inversify.config";
import { Context } from "../framework/Context";

export class Cqrs
{
    private static messageHandlerCollection = [];

    public static RegisterMessageHandler(name: string, klass: any)
    {
        this.messageHandlerCollection[name] = klass; // collection['messageName'] = messageClass
        container.bind(klass).toSelf();
    }

    private static ResolveMessageHandler(name): IMessageHandler
    {
        let n = Object.keys(this.messageHandlerCollection).find(i => i === name);

        if (n === undefined) throw `Could not find handler for message "${ name }".`;

        return container.get(this.messageHandlerCollection[n]) as IMessageHandler;
    }

    public static async Execute(messageAsText: string, context: Context): Promise<any>
    {
        let messagePackage = JSON.parse(messageAsText);

        let messageName = Object.keys(messagePackage)[0]; // First key is a message class name
        let messageBody = messagePackage[messageName]; // Value of first key is message class body/properties

        console.log("Handling", messageName, "...");
        console.log('Message =', messageBody);

        let messageHandler = this.ResolveMessageHandler(messageName);

        return  messageHandler.Handle(messageBody, context);
        // .then((result) =>
        // {
        //     console.log("[cqrs.execute.handle] " + JSON.stringify(result));

         
        // }).catch((error) =>
        // {
        // console.log("[cqrs.execute.handle] "+JSON.stringify(error));
        
        // });
    }
}

