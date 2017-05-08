import { injectable, Container } from 'inversify';
import 'reflect-metadata';
import { AssignMessage } from "../../cqrs/cqrs";
import { AddNoteCommand } from "../../messages/AddNoteCommand";
import { IMessageHandler } from "../../cqrs/IQuery.interface";
import { NotesRepo } from "../../repositories/notes.repo";
import { Context } from "../../framework/Context";
import { NoteEntity } from "../../entities/NoteEntity";


@AssignMessage(AddNoteCommand)
@injectable()
export class AddNoteCommandHandler implements IMessageHandler
{
    constructor(private _notes: NotesRepo) { }

    Handle(command: AddNoteCommand, context: Context): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            if (!context.user.claims.canAddNote)
            {
                return reject("Unauthorized");
            }

            let note: NoteEntity = new NoteEntity();
            note.id = command.id;
            note.parentId = command.parentId;
            note.title = command.title;
            note.content = command.content;

            this._notes.Add(note).then(() =>
            {
                return resolve();
            });
        });
    }
}

