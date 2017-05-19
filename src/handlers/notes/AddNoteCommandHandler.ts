import { UnathorizedException } from './../exceptions/UnathorizedException';
import { injectable, Container, inject } from 'inversify';
import 'reflect-metadata';
import { IMessageHandler } from "../../cqrs/IQuery.interface";
import { Context } from "../../framework/Context";
import { NoteEntity } from "../../entities/NoteEntity";
import { AddNoteCommand } from "../../messages/notes/AddNoteCommand";
import { AssignMessage } from "../../decorators/AssignMessage";
import { INotesRepo } from "../../repositories/INotesRepo";
import { NotesRepo } from "../../repositories/NotesRepo";


@AssignMessage(AddNoteCommand)
@injectable()
export class AddNoteCommandHandler implements IMessageHandler
{
    constructor(@inject("INotesRepo") private _notes: INotesRepo) { }

    public async Handle(command: AddNoteCommand, context: Context): Promise<void>
    {    
        if (!context.user.claims.canAddNote)
        {
            throw new UnathorizedException();
        }

        let note: NoteEntity = new NoteEntity();
        note.id = command.id;
        note.parentId = command.parentId;
        note.userId = context.user.id;
        note.title = command.title;
        note.content = command.content;

        return await this._notes.Add(note);
    }
}

