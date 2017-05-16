import { UnathorizedException } from './../exceptions/UnathorizedException';
import { injectable, Container } from 'inversify';
import 'reflect-metadata';
import { IMessageHandler } from "../../cqrs/IQuery.interface";
import { Context } from "../../framework/Context";
import { NoteEntity } from "../../entities/NoteEntity";
import { AddNoteCommand } from "../../messages/notes/AddNoteCommand";
import { AssignMessage } from "../../decorators/AssignMessage";
import { INotesRepo } from "../../repositories/INotesRepo";


@AssignMessage(AddNoteCommand)
@injectable()
export class AddNoteCommandHandler implements IMessageHandler
{
    constructor(private _notes: INotesRepo) { }

    public Handle(command: AddNoteCommand, context: Context): Promise<null>
    {
        return new Promise((resolve, reject) =>
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

            this._notes.Add(note).then(() =>
            {
                return resolve(null);
            });
        });
    }
}

