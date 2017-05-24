import { UnathorizedException } from './../exceptions/UnathorizedException';
import { injectable, Container, inject } from 'inversify';
import 'reflect-metadata';
import { IMessageHandler } from "../../cqrs/IQuery.interface";
import { Context } from "../../framework/Context";
import { NoteEntity } from "../../entities/NoteEntity";
import { AssignMessage } from "../../decorators/AssignMessage";
import { INotesRepo } from "../../repositories/INotesRepo";
import { NotesRepo } from "../../repositories/NotesRepo";
import { UpdateNoteCommand } from "../../messages/notes/UpdateNoteCommand";


@AssignMessage(UpdateNoteCommand)
@injectable()
export class UpdateNoteCommandHandler implements IMessageHandler
{
    constructor(@inject("INotesRepo") private _notes: INotesRepo) { }

    public async Handle(command: UpdateNoteCommand, context: Context): Promise<void>
    {
        if (!context.user.claims.canChangeNote)
        {
            throw new UnathorizedException();
        }

        let note: NoteEntity = new NoteEntity();
        note.id = command.id;
        note.parentId = command.parentId;
        note.userId = context.user.id;
        note.title = command.title;
        note.content = command.content;

        return await this._notes.Update(note);
    }
}

