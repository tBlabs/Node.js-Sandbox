import { injectable, Container } from 'inversify';
import 'reflect-metadata';
import { IMessageHandler } from "../../cqrs/IQuery.interface";
import { Context } from "../../framework/Context";
import { GetNotesQuery } from "../../messages/notes/GetNotesQuery";
import { AssignMessage } from "../../decorators/AssignMessage";
import { UnathorizedException } from "../exceptions/UnathorizedException";
import { INotesRepo } from "../../repositories/INotesRepo";
import { NoteDto } from "../../dataTransferObjects/noteDto";

@AssignMessage(GetNotesQuery)
@injectable()
export class GetNotesQueryHandler implements IMessageHandler
{
    constructor(private _notes: INotesRepo) { }

    public Handle(query: GetNotesQuery, context: Context): Promise<NoteDto[]>
    {
        return new Promise((resolve, reject) =>
        {
            if (!context.user.claims.canReadNote)
            {
                throw new UnathorizedException();
            }
            
            resolve(this._notes.GetChildren(query.parentId, context.user.id));
        });
    }
}

