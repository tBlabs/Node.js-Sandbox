import { UnathorizedException } from './../../handlers/exceptions/UnathorizedException';
import { Context } from './../../framework/Context';
import { AddNoteCommand } from './../../messages/notes/AddNoteCommand';
import { AddNoteCommandHandler } from './../../handlers/notes/AddNoteCommandHandler';
import { NoteEntity } from "../../entities/NoteEntity";
import { guid } from "../../types";
import { INotesRepo } from "../../repositories/INotesRepo";
import { HandlerException } from "../../framework/HandlerException";

class NotesRepoMock implements INotesRepo
{
    private notes: NoteEntity[] = [];

    public Add(note: NoteEntity): Promise<any>
    {
        return new Promise((resolve, reject) => 
        {
            this.notes.push(note);

            return resolve();
        });
    }

    public GetChildren(parentId: guid, userId: guid): Promise<any>
    {
        return new Promise((resolve, reject) => 
        {
            this.notes.find(n => n.parentId === parentId && n.userId === userId);


            return resolve();
        });
    }
}

describe("Notes handlers", () =>
{
    let notesRepo: INotesRepo = null;
    let addNoteCommandHandler: AddNoteCommandHandler = null;
    let addNoteCommand: AddNoteCommand = null;
    let context: Context = null;

    beforeEach(() =>
    {
        notesRepo = new NotesRepoMock();
        addNoteCommandHandler = new AddNoteCommandHandler(notesRepo);
        addNoteCommand = new AddNoteCommand();
        addNoteCommand.id = "00000000-1111-2222-3333-000000000000";
        addNoteCommand.parentId = "10000000-1111-2222-3333-000000000000";
        addNoteCommand.title = "note title";
        context = new Context();
    });

    it("should add note", () =>
    {
        context.user.claims.canAddNote = true;

        addNoteCommandHandler.Handle(addNoteCommand, context).then((result) =>
        {
            expect(result).toBeNull();
        })
        .catch((e) => console.log("CATCHED EXCEPTION: " + e));
    });

    it("shouldn't add note (unathorized exception)", () =>
    {
        addNoteCommandHandler.Handle(addNoteCommand, context).then((result) =>
        {
            expect(true).toBeFalsy();
        })
        .catch((e: HandlerException) =>
        {
            expect(e.message).toBe(new UnathorizedException().message);
        });
    });
});