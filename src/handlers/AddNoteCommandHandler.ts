import { injectable, Container } from 'inversify';
import 'reflect-metadata';
import { IMessageHandler } from "../cqrs/IQuery.interface";
import { AssignMessage } from "../cqrs/cqrs";
import { AddNoteCommand } from "../messages/AddNoteCommand";
import { B } from "../services/b.class";

@AssignMessage(AddNoteCommand)
@injectable()
export class AddNoteCommandHandler implements IMessageHandler
{
    constructor (b: B)
    {
        console.log("AddNoteCommandHandler constructed");   
    }
    
    Handle(query: AddNoteCommand): string
    {
        return "(value returned from AddNoteCommandHandler)";
    }
}


