import { injectable, Container } from 'inversify';
import 'reflect-metadata';
import { IMessageHandler } from "../cqrs/IQuery.interface";
import { AssignMessage } from "../cqrs/cqrs";
import { guid } from "../types";
import { NoteEntity } from "../entities/NoteEntity";
import { NotesRepo } from "../repositories/notes.repo";
import { Context } from "../framework/Context";
import { GetNotesQuery } from "../messages/GetNotesQuery";

@AssignMessage(GetNotesQuery)
@injectable()
export class GetNotesQueryHandler implements IMessageHandler
{
    constructor(private _notes: NotesRepo) { }

    Handle(query: GetNotesQuery, context: Context): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            resolve(this._notes.GetAllChildren(query.parentId));
        });
    }
}

