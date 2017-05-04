export interface IMessageHandler
{
    Handle(query: any): any;
}