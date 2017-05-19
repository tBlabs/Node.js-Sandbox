import { injectable, Container, inject } from 'inversify';
import 'reflect-metadata';
import { IMessageHandler } from "../../cqrs/IQuery.interface";
import { Context } from "../../framework/Context";
import { GetNotesQuery } from "../../messages/notes/GetNotesQuery";
import { AssignMessage } from "../../decorators/AssignMessage";
import { UnathorizedException } from "../exceptions/UnathorizedException";
import { INotesRepo } from "../../repositories/INotesRepo";
import { NoteDto } from "../../dataTransferObjects/noteDto";
import { NotesRepo } from "../../repositories/NotesRepo";

@AssignMessage(GetNotesQuery)
@injectable()
//@inject("INotesRepo")
export class GetNotesQueryHandler implements IMessageHandler
{
    private _notes: INotesRepo;

    constructor(@inject("INotesRepo") _notes: INotesRepo)
    {
        this._notes = _notes;
    }

    // public Handle(query: GetNotesQuery, context: Context): Promise<NoteDto[]>
    // {
    //     return new Promise((resolve, reject) =>
    //     {
    //         if (!context.user.claims.canReadNote)
    //         {
    //             throw new UnathorizedException();
    //         }

    //         resolve(this._notes.GetChildren(query.parentId, context.user.id));
    //     });
    // }
    public async Handle(query: GetNotesQuery, context: Context): Promise<NoteDto[]>
    {
        if (!context.user.claims.canReadNote) 
        {
            throw new UnathorizedException();
        }

        return await this._notes.GetChildren(query.parentId, context.user.id);
    }
}

