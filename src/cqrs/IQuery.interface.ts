import { Context } from "../framework/Context";

export interface IMessageHandler
{
    Handle(query: any, context: Context): Promise<any>;
}